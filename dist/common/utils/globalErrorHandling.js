"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorHandler = exports.AppError = void 0;
class AppError extends Error {
    message;
    statusCode;
    constructor(message, statusCode = 500) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
const GlobalErrorHandler = (err, req, res, next) => {
    console.log(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message,
        statusCode,
        stack: err.stack,
    });
};
exports.GlobalErrorHandler = GlobalErrorHandler;
//# sourceMappingURL=globalErrorHandling.js.map