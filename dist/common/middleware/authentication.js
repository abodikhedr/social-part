"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const globalErrorHandling_js_1 = require("../utils/globalErrorHandling.js");
const config_service_js_1 = require("../../config/config.service.js");
const user_repository_js_1 = require("../../DB/user.repository.js");
const connection_redis_js_1 = require("../../DB/connection.redis.js");
const authentication = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new globalErrorHandling_js_1.AppError("token doesnt exist", 404);
    }
    const [prefix, token] = authorization.split(" ");
    if (!token) {
        throw new globalErrorHandling_js_1.AppError("token doesnt exist");
    }
    switch (prefix) {
        case "Bearer":
            const decoded = jsonwebtoken_1.default.verify(token, config_service_js_1.ACCESS_TOKEN_SEGNATURE);
            if (!decoded?.id) {
                throw new globalErrorHandling_js_1.AppError("invalid token", 400);
            }
            const user = await new user_repository_js_1.UserRepository().findById({
                id: decoded.id
            });
            if (!user) {
                throw new globalErrorHandling_js_1.AppError("invalid user id", 404);
            }
            if (await new connection_redis_js_1.RedisService().ttl(`revoke_token::${user.id}::${decoded.jti}`) > 0) {
                throw new Error("inValid token please login again");
            }
            req.decoded = decoded;
            req.user = user;
            break;
        case "Basic":
            const data = Buffer.from(token, "base64").toString();
            const [email, password] = data.split(":");
            const userExist = await new user_repository_js_1.UserRepository().findOne({
                filter: {
                    email
                }
            });
            if (!userExist) {
                throw new globalErrorHandling_js_1.AppError("User not found", 404);
            }
            req.user = userExist;
            break;
        default:
            break;
    }
    next();
};
exports.authentication = authentication;
//# sourceMappingURL=authentication.js.map