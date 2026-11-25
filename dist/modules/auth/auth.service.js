"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const globalErrorHandling_js_1 = require("../../common/utils/globalErrorHandling.js");
const user_repository_js_1 = require("../../DB/user.repository.js");
const sendEmail_js_1 = require("../../common/services/sendEmail.js");
const hash_js_1 = require("../../common/security/hash.js");
const connection_redis_js_1 = require("../../DB/connection.redis.js");
const events_js_1 = require("../../common/utils/events.js");
const html_template_js_1 = require("../../common/utils/html.template.js");
const success_response_js_1 = require("../../common/utils/success.response.js");
const auth_helper_js_1 = require("./auth.helper.js");
const google_auth_library_1 = require("google-auth-library");
const config_service_js_1 = require("../../config/config.service.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_enum_js_1 = require("../../common/enum/user.enum.js");
const crypto_1 = require("crypto");
class AuthService {
    constructor() { }
    _userRepo = new user_repository_js_1.UserRepository();
    _redisService = new connection_redis_js_1.RedisService();
    signUp = (0, success_response_js_1.success_response)(async (req, res, next) => {
        const { email, fName, lName, gender, password, phone } = req.body;
        const otp = await (0, sendEmail_js_1.generate_otp)();
        const hashOtp = await (0, hash_js_1.hash)(otp);
        await this._redisService.setValue({
            key: `otp::${email}`,
            value: hashOtp,
            ttl: 60 * 5
        });
        await this._redisService.setValue({
            key: `otp::max::${email}`,
            value: 1,
            ttl: 60 * 5
        });
        const emailExits = await this._userRepo.findOne({ filter: { email } });
        if (emailExits) {
            throw new globalErrorHandling_js_1.AppError("email already exists");
        }
        const user = await this._userRepo.create({
            email,
            fName,
            lName,
            gender,
            password,
            phone
        });
        events_js_1.eventEmitter.emit("confirm_email", async () => {
            await (0, sendEmail_js_1.sendEmail)({
                to: email,
                subject: "confirm email",
                html: html_template_js_1.template.otpmail(otp)
            });
        });
        return { res, statusCode: 201, message: "user created successfully", data: user };
    });
    resendOtp = (0, success_response_js_1.success_response)(async (req, res, next) => {
        const { email } = req.body;
        await (0, auth_helper_js_1.sendEmailOtp)({
            email: email,
            isConfirmed: false
        });
        return { res, statusCode: 201, message: "otp resent successfully" };
    });
    signupWithGmail = (0, success_response_js_1.success_response)(async (req, res, next) => {
        const client = new google_auth_library_1.OAuth2Client();
        const { idToken } = req.body;
        const ticket = await client.verifyIdToken({
            idToken,
            audience: config_service_js_1.AUDIANCE_EMAIL // Specify the WEB_CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
        });
        const payLoad = ticket.getPayload();
        if (!payLoad) {
            throw new globalErrorHandling_js_1.AppError("invalid google token");
        }
        const { family_name, given_name, email, email_verified } = payLoad;
        // This ID is unique to each Google Account, making it suitable for use as a primary key
        // during account lookup. Email is not a good choice because it can be changed by the user.
        if (!email) {
            throw new globalErrorHandling_js_1.AppError("google account has no email");
        }
        if (!email_verified) {
            throw new globalErrorHandling_js_1.AppError("google account has no email");
        }
        let user = await this._userRepo.findOne({
            filter: {
                email: email.toLowerCase()
            }
        });
        if (!user) {
            const [newUser] = await this._userRepo.create({
                email,
                fName: given_name ?? "",
                lName: family_name ?? "",
                isConfirmed: email_verified,
                provider: user_enum_js_1.providerEnum.google
            });
            if (!newUser) {
                throw new globalErrorHandling_js_1.AppError("user not created");
            }
            user = newUser;
        }
        if (user.provider == user_enum_js_1.providerEnum.system) {
            throw new Error("please sign in through the system");
        }
        const access_token = jsonwebtoken_1.default.sign({
            id: user._id,
            email: user.email,
        }, config_service_js_1.ACCESS_TOKEN_SEGNATURE, {
            expiresIn: "60s",
        });
        const refresh_token = jsonwebtoken_1.default.sign({
            id: user._id,
            email: user.email,
        }, config_service_js_1.REFRESH_TOKEN_SEGNATURE);
        return { res, statusCode: 201, message: "successfully signed in", data: { access_token, refresh_token } };
    });
    confirmOtp = (0, success_response_js_1.success_response)(async (req, res, next) => {
        const { email, otp } = req.body;
        const otpValue = await this._redisService.getValue(`otp::${email}`);
        if (!otpValue) {
            throw new Error("otp expired");
        }
        if (!await (0, hash_js_1.compare)(otp, otpValue)) {
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
        });
        if (!user) {
            throw new Error("user doesnt exist or already confirmed");
        }
        this._redisService.deleteKey(`otp::${email}`);
        return { res, statusCode: 200, message: "email confirmed" };
    });
    signin = (0, success_response_js_1.success_response)(async (req, res, next) => {
        const tokenId = (0, crypto_1.randomUUID)();
        const { email, password } = req.body;
        const attempts = await this._redisService.getValue(`attempts::${email}`);
        if (!await this._redisService.exists(`attempts::${email}`)) {
            await this._redisService.setValue({
                key: `attempts::${email}`,
                value: 0,
                ttl: 5 * 60
            });
        }
        const isBlocked = await this._redisService.ttl(`attempts::block::${email}`);
        if (isBlocked > 0) {
            throw new Error(`you have been blocked please try again in ${isBlocked} seconds`);
        }
        if (attempts >= 5) {
            await this._redisService.setValue({
                key: `attempts::block::${email}`,
                value: "1",
                ttl: 5 * 60
            });
            throw new Error("reached the maximum number of attempts please try again in 5 minutes");
        }
        const user = await this._userRepo.findOne({
            filter: {
                email: email.toLowerCase(),
                provider: user_enum_js_1.providerEnum.system
            }
        });
        if (!user || !await (0, hash_js_1.compare)(password, user.password)) {
            await this._redisService.incr(`attempts::${email}`);
            throw new Error("invalid credentials", { cause: 401 });
        }
        if (user.isConfirmed == false) {
            throw new Error("user isnt confirmed", { cause: 400 });
        }
        const access_token = jsonwebtoken_1.default.sign({
            id: user._id,
            email: user.email,
        }, config_service_js_1.ACCESS_TOKEN_SEGNATURE, {
            expiresIn: "400s",
            audience: "http://localhost:4000",
            issuer: "http://localhost:3000",
            jwtid: tokenId
        });
        const refresh_token = jsonwebtoken_1.default.sign({
            id: user._id,
            email: user.email,
        }, config_service_js_1.REFRESH_TOKEN_SEGNATURE, {
            expiresIn: "4000s",
            audience: "http://localhost:4000",
            issuer: "http://localhost:3000",
            jwtid: tokenId
        });
        this._redisService.deleteKey(`attempts::${email}`);
        return { res, statusCode: 200, message: "successfully signed in", data: { access_token, refresh_token } };
    });
    refreshToken = (0, success_response_js_1.success_response)(async (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new Error("token doesnt exist", { cause: 404 });
        }
        const decoded = jsonwebtoken_1.default.verify(authorization, config_service_js_1.REFRESH_TOKEN_SEGNATURE);
        if (!decoded?.id) {
            throw new Error("inValid token", { cause: 400 });
        }
        const user = await this._userRepo.findOne({
            filter: {
                _id: decoded.id
            }
        });
        if (!user) {
            throw new globalErrorHandling_js_1.AppError("user not found");
        }
        const access_token = jsonwebtoken_1.default.sign({
            id: user._id,
            email: user.email,
        }, config_service_js_1.ACCESS_TOKEN_SEGNATURE);
        return { res, statusCode: 201, message: "done", data: access_token };
    });
    forgetPassword = (0, success_response_js_1.success_response)(async (req, res, next) => {
        const { email } = req.body;
        await (0, auth_helper_js_1.sendEmailOtp)({
            email: email,
            isConfirmed: true
        });
        return { res, statusCode: 200, message: "password otp generated successfully" };
    });
    confirmPasswordOtp = (0, success_response_js_1.success_response)(async (req, res, next) => {
        const { email, otp, newpass } = req.body;
        const hashotp = await this._redisService.getValue(`otp::${email}`);
        if (!hashotp) {
            throw new Error("you should forget password first");
        }
        if (!await (0, hash_js_1.compare)(otp, hashotp)) {
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
        });
        if (!user) {
            throw new Error("user not found");
        }
        await this._redisService.deleteKey(`otp::${email}`);
        return { res, statusCode: 200, message: "successfully changed password" };
    });
}
exports.AuthService = AuthService;
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map