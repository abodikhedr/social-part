
import { createClient, type RedisClientType } from "redis"
import { REDIS_URL } from "../config/config.service.js";

const client: RedisClientType = createClient({
    url: REDIS_URL
});
client.on("error", (err) => console.log("redis error:", err));

export class RedisService {

    constructor(){}
    private readonly redis_client: RedisClientType= client
    redisConnection = async () => {
        try {

            await this.redis_client.connect();
            console.log("redis connected successfuly");

        } catch (error) {
            console.log("redis failed to connect");
        }
    }


    setValue = async<T> ({ key, value, ttl }: { key: string, value: T , ttl?: number }) => {
        try {
            const data = typeof value == "string" ? value : JSON.stringify(value)
            ttl ?
                await this.redis_client.set(key, data, { EX: ttl }) :
                await this.redis_client.set(key, data)

        } catch (error) {
            console.log(error, "\n redis setValue failed");

        }
    }

    update = async ({ key, value, ttl }: { key: string, value: string, ttl: number }) => {
        try {
            if (!await this.redis_client.exists(key)) return 0
            await this.redis_client.set(key, value, { EX: ttl })

        } catch (error) {
            console.log(error, "\n redis updateValue failed");

        }
    }

    getValue = async (key: string) => {
        try {
            try {
                return JSON.parse(await this.redis_client.get(key) as string)
            } catch (error) {
                return await this.redis_client.get(key)
            }

        } catch (error) {
            console.log(error, "\n redis getValue failed");

        }
    }

    ttl = async (key: string) => {
        try {
            return await this.redis_client.ttl(key)
        } catch (error) {
            console.log(error, "\n redis ttl failed");
            throw error
        }
    }

    exists = async (key: string) => {
        try {
            return await this.redis_client.exists(key)
        } catch (error) {
            console.log(error, "\n redis exists failed");

        }
    }

    expires = async ({ key, ttl }:{key:string,ttl:number}) => {
        try {
            await this.redis_client.expire(key, ttl)
        } catch (error) {
            console.log(error, "\n redis expires failed");

        }
    }

    deleteKey = async (key:string) => {
        try {
            if (!key?.length) return 0
            await this.redis_client.del(key)
        } catch (error) {
            console.log(error, "\n redis deleteKey failed");

        }
    }

    keys = async (key:string) => {
        try {
            return await this.redis_client.keys(`${key}*`)
        } catch (error) {
            console.log(error, "\n redis keys failed");

        }
    }

    incr = async (key:string) => {
        try {
            return await this.redis_client.incr(key)
        } catch (error) {
            console.log(error, "\n redis incr failed");

        }
    }
}

export default new RedisService()







