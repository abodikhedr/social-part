import jwt, { JwtPayload } from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/globalErrorHandling.js";
import { ACCESS_TOKEN_SEGNATURE } from "../../config/config.service.js";
import { UserRepository } from "../../DB/user.repository.js";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Iuser } from "../../DB/models/user.model.js";
import { RedisService } from "../../DB/connection.redis.js";

export interface TokenPayLoad extends JwtPayload {
    id: ObjectId,
    email: string
}
declare global {
    namespace Express {
        interface Request {
            decoded?: TokenPayLoad,
            user?: HydratedDocument<Iuser>
        }
    }
}

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    if (!authorization) {
        throw new AppError("token doesnt exist", 404);
    }
    const [prefix, token] = authorization.split(" ")
    if (!token) {
        throw new AppError("token doesnt exist")
    }
    switch (prefix) {
        case "Bearer":
            const decoded = jwt.verify(token, ACCESS_TOKEN_SEGNATURE) as TokenPayLoad
            if (!decoded?.id) {
                throw new AppError("invalid token", 400);
            }
            const user = await new UserRepository().findById({
                id: decoded.id
            })
            if (!user) {
                throw new AppError("invalid user id", 404);
            }
            if (await new RedisService().ttl(`revoke_token::${user.id}::${decoded.jti}`) > 0) {
                throw new Error("inValid token please login again");
            }
            req.decoded = decoded
            req.user = user
            break
        case "Basic":
            const data = Buffer.from(token, "base64").toString()
            const [email, password] = data.split(":")
            const userExist = await new UserRepository().findOne({
                filter: {
                    email
                } as any
            })
            if (!userExist) {
                throw new AppError("User not found", 404)
            }
            req.user = userExist
            break
        default:
            break
            
    }

    next()
}