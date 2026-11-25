"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailOtp = void 0;
const hash_js_1 = require("../../common/security/hash.js");
const sendEmail_js_1 = require("../../common/services/sendEmail.js");
const events_js_1 = require("../../common/utils/events.js");
const html_template_js_1 = require("../../common/utils/html.template.js");
const connection_redis_js_1 = require("../../DB/connection.redis.js");
const user_repository_js_1 = require("../../DB/user.repository.js");
const redisService = new connection_redis_js_1.RedisService();
const userRepo = new user_repository_js_1.UserRepository();
const sendEmailOtp = async ({ email, isConfirmed = false, }) => {
    const isBlocked = await redisService.ttl(`otp::block::${email}`);
    if (isBlocked > 0)
        throw new Error(`you are blocked,you can resend otp after ${isBlocked}`);
    const ttlOtp = await redisService.ttl(`otp::${email}`);
    if (ttlOtp > 0)
        throw new Error(`you can resend otp after ${ttlOtp}`);
    const max_otp = await redisService.getValue(`otp::max::${email}`);
    if (max_otp >= 3) {
        await redisService.setValue({
            key: `otp::block::${email}`,
            value: "1",
            ttl: 60 * 5
        });
        await redisService.deleteKey(`otp::max::${email}`);
        throw new Error("you have exceeded the maximum number of tries");
    }
    const user = await userRepo.findOne({
        filter: {
            email: email,
            isConfirmed: isConfirmed
        }
    });
    if (!user)
        throw new Error("email doesnt exist or user is already confirmed");
    const otp = await (0, sendEmail_js_1.generate_otp)();
    const hashOtp = await (0, hash_js_1.hash)(otp);
    await redisService.setValue({
        key: `otp::${email}`,
        value: hashOtp,
        ttl: 60 * 2
    });
    events_js_1.eventEmitter.emit("confirm_email", async () => {
        await (0, sendEmail_js_1.sendEmail)({
            to: email,
            subject: "confirm email",
            html: html_template_js_1.template.otpmail(otp)
        });
    });
    await redisService.incr(`otp::max::${email}`);
};
exports.sendEmailOtp = sendEmailOtp;
//# sourceMappingURL=auth.helper.js.map