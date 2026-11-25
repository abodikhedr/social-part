"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const globalErrorHandling_js_1 = require("../utils/globalErrorHandling.js");
const authorization = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            throw new globalErrorHandling_js_1.AppError("unauthenticated", 401);
        }
        if (!roles.includes(req.user.role)) {
            throw new Error("user not authorized");
        }
        next();
    };
};
exports.authorization = authorization;
//# sourceMappingURL=authorization.js.map