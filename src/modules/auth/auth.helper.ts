import { hash } from "../../common/security/hash.js";
import { generate_otp, sendEmail } from "../../common/services/sendEmail.js";
import { eventEmitter } from "../../common/utils/events.js";
import { template } from "../../common/utils/html.template.js";
import { RedisService } from "../../DB/connection.redis.js";
import { UserRepository } from "../../DB/user.repository.js";

    const redisService=new RedisService()
    const userRepo = new UserRepository()
    


export const sendEmailOtp = async ({ email, isConfirmed = false, }:{
    email:string,
    isConfirmed:boolean
}) => {
    const isBlocked = await redisService.ttl(`otp::block::${email}`)
    if (isBlocked > 0) throw new Error(`you are blocked,you can resend otp after ${isBlocked}`);
    const ttlOtp = await redisService.ttl(`otp::${email}`)
    if (ttlOtp > 0) throw new Error(`you can resend otp after ${ttlOtp}`);
    const max_otp = await redisService.getValue(`otp::max::${email}`)
    if (max_otp >= 3) {
        await redisService.setValue({
            key: `otp::block::${email}`,
            value: "1",
            ttl: 60 * 5
        })
        await redisService.deleteKey(`otp::max::${email}`)
        throw new Error("you have exceeded the maximum number of tries");
    }
    const user = await userRepo.findOne({
        filter: {
            email: email,
            isConfirmed:isConfirmed
        }
    })
    if (!user) throw new Error("email doesnt exist or user is already confirmed");
    const otp = await generate_otp()
    const hashOtp = await hash(otp)
    await redisService.setValue({
        key: `otp::${email}`,
        value: hashOtp,
        ttl: 60 * 2
    })
    eventEmitter.emit("confirm_email", async () => {
        await sendEmail({
            to: email,
            subject: "confirm email",
            html: template.otpmail(otp)
        })
    }
    )
    await redisService.incr(`otp::max::${email}`)
}