import * as z from "zod";
import { genderEnum } from "../../common/enum/user.enum.js";
import { AppError } from "../../common/utils/globalErrorHandling.js";
import { generalRules } from "../../common/utils/generalRules.js";



export const signUpSchema = {
    body: z.strictObject({
        fName: generalRules.fName,
        lName: generalRules.lName,
        email: generalRules.email,
        password: generalRules.password,
        cPassword: z.string(),
        gender: generalRules.gender,
        phone: generalRules.phone,
    }).superRefine((value,ctx)=>{
        if (value.cPassword!==value.password) {
            ctx.addIssue({
                code:"custom",
                message:"password and cPassword must be the same"
            })
        }
    })
}


export const signInSchema = {
    body: z.strictObject({
        email: generalRules.email,
        password: generalRules.password
    })
}
export const resendOtpSchema = {
    body: z.strictObject({
        email: generalRules.email
    })
}
export const forgetPasswordSchema = {
    body: z.strictObject({
        email:generalRules.email
    })
}
export const confirmPasswordOtpSchema = {
    body: z.strictObject({
        email:generalRules.email,
        otp:generalRules.otp,
        newpass: generalRules.password
    })
}
export const refreshTokenSchema = {
    headers: generalRules.token
}

export const confirmOtpSchema = {
    body: z.object({
        email: generalRules.email,
        otp: generalRules.otp,
    })
}










