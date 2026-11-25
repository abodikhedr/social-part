"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_service_js_1 = require("./config/config.service.js");
const globalErrorHandling_js_1 = require("./common/utils/globalErrorHandling.js");
const connectionDB_js_1 = __importDefault(require("./DB/connectionDB.js"));
const auth_controller_js_1 = require("./modules/auth/auth.controller.js");
const connection_redis_js_1 = __importDefault(require("./DB/connection.redis.js"));
const user_controller_js_1 = require("./modules/user/user.controller.js");
const app = (0, express_1.default)();
const port = config_service_js_1.PORT;
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 5 * 1000,
    limit: 30,
    skipSuccessfulRequests: true,
    message: {
        success: false,
        message: "too many requests"
    }
});
const bootstrap = async () => {
    app.use(express_1.default.json(), (0, helmet_1.default)(), (0, cors_1.default)(), limiter);
    await (0, connectionDB_js_1.default)();
    await connection_redis_js_1.default.redisConnection();
    app.get("/", (req, res, next) => {
        res.status(200).json({ message: "haii" });
    });
    app.use("/auth", auth_controller_js_1.authRouter);
    app.use("/user", user_controller_js_1.userRouter);
    app.use("{/*demo}", (req, res, next) => {
        throw new globalErrorHandling_js_1.AppError(`url:${req.originalUrl} with method:${req.method} not found`, 404);
    });
    app.use(globalErrorHandling_js_1.GlobalErrorHandler);
    app.listen(port, () => {
        console.log(`app working on port:${port}`);
    });
};
exports.default = bootstrap;
//# sourceMappingURL=app.bootstrap.js.map