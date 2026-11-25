import { Router } from "express";
import As from "./auth.service.js"
import { validation } from "../../common/middleware/validatiov.js";
import { confirmOtpSchema, confirmPasswordOtpSchema, forgetPasswordSchema, refreshTokenSchema, resendOtpSchema, signInSchema, signUpSchema } from "./auth.validation.js";

export const authRouter=Router()

authRouter.post("/signup",validation(signUpSchema),As.signUp)
authRouter.post("/signupWithGmail",As.signupWithGmail)
authRouter.post("/signin",validation(signInSchema),As.signin)
authRouter.post("/refresh_token", validation(refreshTokenSchema), As.refreshToken)
authRouter.post("/resend_otp",validation(resendOtpSchema), As.resendOtp)
authRouter.post("/forget_password",validation(forgetPasswordSchema), As.forgetPassword)
authRouter.post("/confirm_password",validation(confirmPasswordOtpSchema), As.confirmPasswordOtp)
authRouter.post("/confirm_otp", validation(confirmOtpSchema), As.confirmOtp)



