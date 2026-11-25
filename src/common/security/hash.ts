import { compareSync, hashSync } from "bcrypt"
import { SALT_ROUNDS } from "../../config/config.service.js"



export const hash =async(plainText:string,saltRounds=SALT_ROUNDS):Promise<string>=>{
    return hashSync(plainText,saltRounds)
}

export const compare =async(plainText:string,hashedText:string)=>{
    return compareSync(plainText,hashedText)
}