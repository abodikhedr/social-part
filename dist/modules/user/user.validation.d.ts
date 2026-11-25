import z from "zod";
import { genderEnum } from "../../common/enum/user.enum.js";
export declare const getProfileSchema: {
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
export declare const updateProfileSchema: {
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
    body: z.ZodObject<{
        fName: z.ZodOptional<z.ZodString>;
        lName: z.ZodOptional<z.ZodString>;
        gender: z.ZodOptional<z.ZodEnum<{
            female: genderEnum.female;
            male: genderEnum.male;
        }>>;
        phone: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
};
export declare const followSchema: {
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
    query: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
};
export declare const unFollowSchema: {
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
    query: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
};
export declare const searchUserSchema: {
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
};
//# sourceMappingURL=user.validation.d.ts.map