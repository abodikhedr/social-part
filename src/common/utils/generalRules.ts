import z from "zod"
import { genderEnum } from "../enum/user.enum.js"
import { Types } from "mongoose"
export const generalRules={
    id:z.string().refine((value)=>{
        return Types.ObjectId.isValid(value)
    },{
        message:"inValid id"
    }),
    fName: z.string().min(2).max(10),
    lName: z.string().min(2).max(10),
    email: z.email(),
    password: z.string(),
    age: z.number().min(18).max(60),
    phone: z.string(),
    gender: z.enum([genderEnum.male, genderEnum.female]),
    otp:z.string().regex(/^[0-9]{6}$/),
    
    token: z.strictObject({
        authorization: z.string(),
        connection: z.string().optional(),
        "accept-encoding": z.string().optional(),
        accept: z.string().optional(),
        "user-agent": z.string().optional(),
        host: z.string().optional(),
        "content-length": z.string().optional(),
        "postman-token": z.string().optional(),
        "content-type": z.string().optional(),

    })
}