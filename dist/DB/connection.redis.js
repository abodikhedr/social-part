"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const redis_1 = require("redis");
const config_service_js_1 = require("../config/config.service.js");
const client = (0, redis_1.createClient)({
    url: config_service_js_1.REDIS_URL
});
client.on("error", (err) => console.log("redis error:", err));
class RedisService {
    constructor() { }
    redis_client = client;
    redisConnection = async () => {
        try {
            await this.redis_client.connect();
            console.log("redis connected successfuly");
        }
        catch (error) {
            console.log("redis failed to connect");
        }
    };
    setValue = async ({ key, value, ttl }) => {
        try {
            const data = typeof value == "string" ? value : JSON.stringify(value);
            ttl ?
                await this.redis_client.set(key, data, { EX: ttl }) :
                await this.redis_client.set(key, data);
        }
        catch (error) {
            console.log(error, "\n redis setValue failed");
        }
    };
    update = async ({ key, value, ttl }) => {
        try {
            if (!await this.redis_client.exists(key))
                return 0;
            await this.redis_client.set(key, value, { EX: ttl });
        }
        catch (error) {
            console.log(error, "\n redis updateValue failed");
        }
    };
    getValue = async (key) => {
        try {
            try {
                return JSON.parse(await this.redis_client.get(key));
            }
            catch (error) {
                return await this.redis_client.get(key);
            }
        }
        catch (error) {
            console.log(error, "\n redis getValue failed");
        }
    };
    ttl = async (key) => {
        try {
            return await this.redis_client.ttl(key);
        }
        catch (error) {
            console.log(error, "\n redis ttl failed");
            throw error;
        }
    };
    exists = async (key) => {
        try {
            return await this.redis_client.exists(key);
        }
        catch (error) {
            console.log(error, "\n redis exists failed");
        }
    };
    expires = async ({ key, ttl }) => {
        try {
            await this.redis_client.expire(key, ttl);
        }
        catch (error) {
            console.log(error, "\n redis expires failed");
        }
    };
    deleteKey = async (key) => {
        try {
            if (!key?.length)
                return 0;
            await this.redis_client.del(key);
        }
        catch (error) {
            console.log(error, "\n redis deleteKey failed");
        }
    };
    keys = async (key) => {
        try {
            return await this.redis_client.keys(`${key}*`);
        }
        catch (error) {
            console.log(error, "\n redis keys failed");
        }
    };
    incr = async (key) => {
        try {
            return await this.redis_client.incr(key);
        }
        catch (error) {
            console.log(error, "\n redis incr failed");
        }
    };
}
exports.RedisService = RedisService;
exports.default = new RedisService();
//# sourceMappingURL=connection.redis.js.map