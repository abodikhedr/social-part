import express, { type NextFunction, type Request, type Response } from "express"
import userModel, { Iuser } from "../../DB/models/user.model.js"
import { AppError } from "../../common/utils/globalErrorHandling.js"
import { signUpSchema } from "./auth.validation.js"
import { HydratedDocument, set } from "mongoose"
import { DBRepository } from "../../DB/db.repository.js"
import { UserRepository } from "../../DB/user.repository.js"
import { generate_otp, sendEmail } from "../../common/services/sendEmail.js"
import { compare, hash } from "../../common/security/hash.js"
import connectionRedis, { RedisService } from "../../DB/connection.redis.js"
import { decrypt, Encrypt } from "../../common/security/encrypt.js"
import { eventEmitter } from "../../common/utils/events.js"
import { template } from "../../common/utils/html.template.js"
import { success_response } from "../../common/utils/success.response.js"
import { sendEmailOtp } from "./auth.helper.js"
import { OAuth2Client, TokenPayload } from "google-auth-library"
import { ACCESS_TOKEN_SEGNATURE, AUDIANCE_EMAIL, REFRESH_TOKEN_SEGNATURE } from "../../config/config.service.js"
import jwt from "jsonwebtoken"
import { providerEnum } from "../../common/enum/user.enum.js"
import { randomUUID } from "crypto"
import { TokenPayLoad } from "../../common/middleware/authentication.js"



export class AuthService {
    constructor() { }
    private readonly _userRepo = new UserRepository()
    private readonly _redisService = new RedisService()
    signUp = success_response(async (req: Request, res: Response, next: NextFunction) => {

        const { email, fName, lName, gender, password, phone }: Iuser = req.body
        const otp = await generate_otp()
        const hashOtp = await hash(otp)
        await this._redisService.setValue({
            key: `otp::${email}`,
            value: hashOtp,
            ttl: 60 * 5

        })
        await this._redisService.setValue({
            key: `otp::max::${email}`,
            value: 1,
            ttl: 60 * 5
        })


        const emailExits = await this._userRepo.findOne({ filter: { email } })
        if (emailExits) {
            throw new AppError("email already exists");

        }
        const user = await this._userRepo.create({
            email,
            fName,
            lName,
            gender,
            password,
            phone
        } as Partial<Iuser>)
        eventEmitter.emit("confirm_email", async () => {
            await sendEmail({
                to: email,
                subject: "confirm email",
                html: template.otpmail(otp)
            })
        })
        return { statusCode: 201, message: "user created successfully", data: user }
    })


    resendOtp = success_response(async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body
        await sendEmailOtp({
            email: email,
            isConfirmed: false
        })
        return{ statusCode: 201, message: "otp resent successfully" }

    }
)

    signupWithGmail = success_response(async (req: Request, res: Response, next: NextFunction) => {
        const client = new OAuth2Client();
        const { idToken } = req.body
        const ticket = await client.verifyIdToken({
            idToken,
            audience: AUDIANCE_EMAIL // Specify the WEB_CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
        });
        const payLoad = ticket.getPayload()
        if (!payLoad) {
            throw new AppError("invalid google token");
        }
        const { family_name, given_name, email, email_verified } = payLoad;
        // This ID is unique to each Google Account, making it suitable for use as a primary key
        // during account lookup. Email is not a good choice because it can be changed by the user.

        if (!email) {
            throw new AppError("google account has no email");

        }
        if (!email_verified) {
            throw new AppError("google account has no email");

        }
        let user = await this._userRepo.findOne({
            filter: {
                email: email.toLowerCase()
            }
        })
        if (!user) {
            const [newUser] = await this._userRepo.create({
                email,
                fName: given_name ?? "",
                lName: family_name ?? "",
                isConfirmed: email_verified,
                provider: providerEnum.google
            })
            if (!newUser) {
                throw new AppError("user not created");
            }
            user = newUser
        }

        if (user.provider == providerEnum.system) {
            throw new Error("please sign in through the system")
        }

        const access_token = jwt.sign({
            id: user._id,
            email: user.email,

        }, ACCESS_TOKEN_SEGNATURE,
            {
                expiresIn: "60s",


            })
        const refresh_token = jwt.sign({
            id: user._id,
            email: user.email,

        }, REFRESH_TOKEN_SEGNATURE)

        return{ statusCode: 201, message: "successfully signed in", data: { access_token, refresh_token } }
    })



    confirmOtp =success_response( async (req: Request, res: Response, next: NextFunction) => {

        const { email, otp } = req.body
        const otpValue = await this._redisService.getValue(`otp::${email}`)
        if (!otpValue) {
            throw new Error("otp expired");
        }
        if (! await compare(otp, otpValue)) {
            throw new Error("inValid otp");
        }
        const user = await this._userRepo.findOneAndUpdate({
            filter: {
                email,
                isConfirmed: false
            },
            update: {
                isConfirmed: true
            }
        })
        if (!user) {
            throw new Error("user doesnt exist or already confirmed");
        }
        this._redisService.deleteKey(`otp::${email}`)
        return{  statusCode: 200, message: "email confirmed" }

    })


    signin = success_response(async (req: Request, res: Response, next: NextFunction) => {
        const tokenId = randomUUID()
        const { email, password } = req.body
        const attempts = await this._redisService.getValue(`attempts::${email}`)
        if (! await this._redisService.exists(`attempts::${email}`)) {
            await this._redisService.setValue({
                key: `attempts::${email}`,
                value: 0,
                ttl: 5 * 60
            })
        }
        const isBlocked = await this._redisService.ttl(`attempts::block::${email}`)
        if (isBlocked > 0) {
            throw new Error(`you have been blocked please try again in ${isBlocked} seconds`);
        }
        if (attempts >= 5) {
            await this._redisService.setValue({
                key: `attempts::block::${email}`,
                value: "1",
                ttl: 5 * 60
            })
            throw new Error("reached the maximum number of attempts please try again in 5 minutes");
        }
        const user = await this._userRepo.findOne({
            filter: {
                email: email.toLowerCase(),
                provider: providerEnum.system
            }
        })
        if (!user || ! await compare(password, user.password)) {
            await this._redisService.incr(`attempts::${email}`)
            throw new Error("invalid credentials", { cause: 401 })
        }
        if (user.isConfirmed == false) {
            throw new Error("user isnt confirmed", { cause: 400 })
        }

        const access_token = jwt.sign({
            id: user._id,
            email: user.email,
        }, ACCESS_TOKEN_SEGNATURE,
            {
                expiresIn: "400s",
                audience: "http://localhost:4000",
                issuer: "http://localhost:3000",
                jwtid: tokenId
            })
        const refresh_token = jwt.sign({
            id: user._id,
            email: user.email,
        }, REFRESH_TOKEN_SEGNATURE, {
            expiresIn: "4000s",
            audience: "http://localhost:4000",
            issuer: "http://localhost:3000",
            jwtid: tokenId
        })
        this._redisService.deleteKey(`attempts::${email}`)
        return{  statusCode: 200, message: "successfully signed in", data: { access_token, refresh_token } }
    })



    refreshToken = success_response(async (req: Request, res: Response, next: NextFunction) => {
        const { authorization } = req.headers
        if (!authorization) {
            throw new Error("token doesnt exist", { cause: 404 })
        }
        const decoded = jwt.verify(authorization, REFRESH_TOKEN_SEGNATURE) as TokenPayLoad
        if (!decoded?.id) {
            throw new Error("inValid token", { cause: 400 })
        }
        const user = await this._userRepo.findOne({
            filter: {
                _id: decoded.id
            }
        })
        if (!user) {
            throw new AppError("user not found")
        }
        const access_token = jwt.sign({
            id: user._id,
            email: user.email,
        }, ACCESS_TOKEN_SEGNATURE,
        )
        return {  statusCode: 201, message: "done", data: access_token }


    }
)
    forgetPassword = success_response(async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body
        await sendEmailOtp({
            email: email,
            isConfirmed: true
        })
        return{ res, statusCode: 200, message: "password otp generated successfully" }

    })

    confirmPasswordOtp = success_response(async (req: Request, res: Response, next: NextFunction) => {
        const { email, otp, newpass } = req.body
        const hashotp = await this._redisService.getValue(`otp::${email}`)
        if (!hashotp) {
            throw new Error("you should forget password first");

        }
        if (!await compare(otp, hashotp)) {
            throw new Error("inValid otp");
        }
        const user = await this._userRepo.findOneAndUpdate({
            filter: {
                email: email,
                isConfirmed: true
            },
            update: {
                password: newpass
            }
        })
        if (!user) {
            throw new Error("user not found");

        }
        await this._redisService.deleteKey(`otp::${email}`)
        return {  statusCode: 200, message: "successfully changed password" }


    }
)



}

export default new AuthService()