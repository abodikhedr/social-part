import z from "zod"
import { genderEnum } from "../../common/enum/user.enum.js"
import { generalRules } from "../../common/utils/generalRules.js"


export const getProfileSchema = {
    headers: generalRules.token
}

export const updateProfileSchema = {
    headers: generalRules.token,
    body: z.strictObject({
        fName: generalRules.fName.optional(),
        lName: generalRules.lName.optional(),
        gender: generalRules.gender.optional(),
        phone: generalRules.phone.optional(),
    })
}

export const followSchema = {
    headers: generalRules.token,
    query: z.strictObject({
        id: generalRules.id
    })
}
export const unFollowSchema = {
    headers: generalRules.token,
    query: z.strictObject({
        id: generalRules.id
    })
}

export const searchUserSchema = {
    params: z.strictObject({id:generalRules.id})
}