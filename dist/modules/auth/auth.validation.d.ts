import * as z from "zod";
import { genderEnum } from "../../common/enum/user.enum.js";
export declare const signUpSchema: {
    body: z.ZodObject<{
        fName: z.ZodString;
        lName: z.ZodString;
        email: z.ZodEmail;
        password: z.ZodString;
        cPassword: z.ZodString;
        gender: z.ZodEnum<{
            female: genderEnum.female;
            male: genderEnum.male;
        }>;
        phone: z.ZodString;
    }, z.core.$strict>;
};
export declare const signInSchema: {
    body: z.ZodObject<{
        email: z.ZodEmail;
        password: z.ZodString;
    }, z.core.$strict>;
};
export declare const resendOtpSchema: {
    body: z.ZodObject<{
        email: z.ZodEmail;
    }, z.core.$strict>;
};
export declare const forgetPasswordSchema: {
    body: z.ZodObject<{
        email: z.ZodEmail;
    }, z.core.$strict>;
};
export declare const confirmPasswordOtpSchema: {
    body: z.ZodObject<{
        email: z.ZodEmail;
        otp: z.ZodString;
        newpass: z.ZodString;
    }, z.core.$strict>;
};
export declare const refreshTokenSchema: {
    headers: z.ZodObject<{
        authorization: z.ZodString;
        connection: z.ZodOptional<z.ZodString>;
        "accept-encoding": z.ZodOptional<z.ZodString>;
        accept: z.ZodOptional<z.ZodString>;
        "user-agent": z.ZodOptional<z.ZodString>;
        host: z.ZodOptional<z.ZodString>;
        "content-length": z.ZodOptional<z.ZodString>;
        "postman-token": z.ZodOptional<z.ZodString>;
        "content-type": z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
};
export declare const confirmOtpSchema: {
    body: z.ZodObject<{
        email: z.ZodEmail;
        otp: z.ZodString;
    }, z.core.$strip>;
};
//# sourceMappingURL=auth.validation.d.ts.map