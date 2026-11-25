export declare class RedisService {
    constructor();
    private readonly redis_client;
    redisConnection: () => Promise<void>;
    setValue: <T>({ key, value, ttl }: {
        key: string;
        value: T;
        ttl?: number;
    }) => Promise<void>;
    update: ({ key, value, ttl }: {
        key: string;
        value: string;
        ttl: number;
    }) => Promise<0 | undefined>;
    getValue: (key: string) => Promise<any>;
    ttl: (key: string) => Promise<number>;
    exists: (key: string) => Promise<number | undefined>;
    expires: ({ key, ttl }: {
        key: string;
        ttl: number;
    }) => Promise<void>;
    deleteKey: (key: string) => Promise<0 | undefined>;
    keys: (key: string) => Promise<string[] | undefined>;
    incr: (key: string) => Promise<number | undefined>;
}
declare const _default: RedisService;
export default _default;
//# sourceMappingURL=connection.redis.d.ts.map