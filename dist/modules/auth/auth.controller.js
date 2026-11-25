"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_service_js_1 = __importDefault(require("./auth.service.js"));
const validatiov_js_1 = require("../../common/middleware/validatiov.js");
const auth_validation_js_1 = require("./auth.validation.js");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/signup", (0, validatiov_js_1.validation)(auth_validation_js_1.signUpSchema), auth_service_js_1.default.signUp);
exports.authRouter.post("/signupWithGmail", auth_service_js_1.default.signupWithGmail);
exports.authRouter.post("/signin", (0, validatiov_js_1.validation)(auth_validation_js_1.signInSchema), auth_service_js_1.default.signin);
exports.authRouter.post("/refresh_token", (0, validatiov_js_1.validation)(auth_validation_js_1.refreshTokenSchema), auth_service_js_1.default.refreshToken);
exports.authRouter.post("/resend_otp", (0, validatiov_js_1.validation)(auth_validation_js_1.resendOtpSchema), auth_service_js_1.default.resendOtp);
exports.authRouter.post("/forget_password", (0, validatiov_js_1.validation)(auth_validation_js_1.forgetPasswordSchema), auth_service_js_1.default.forgetPassword);
exports.authRouter.post("/confirm_password", (0, validatiov_js_1.validation)(auth_validation_js_1.confirmPasswordOtpSchema), auth_service_js_1.default.confirmPasswordOtp);
exports.authRouter.post("/confirm_otp", (0, validatiov_js_1.validation)(auth_validation_js_1.confirmOtpSchema), auth_service_js_1.default.confirmOtp);
//# sourceMappingURL=auth.controller.js.map