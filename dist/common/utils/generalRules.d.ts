import z from "zod";
import { genderEnum } from "../enum/user.enum.js";
export declare const generalRules: {
    id: z.ZodString;
    fName: z.ZodString;
    lName: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    age: z.ZodNumber;
    phone: z.ZodString;
    gender: z.ZodEnum<{
        female: genderEnum.female;
        male: genderEnum.male;
    }>;
    otp: z.ZodString;
    token: z.ZodObject<{
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
//# sourceMappingURL=generalRules.d.ts.map