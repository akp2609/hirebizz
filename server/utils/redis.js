import { createClient } from 'redis';

let redisClient;

export async function initRedis() {
    const host = process.env.REDIS_HOST;
    const port = Number(process.env.REDIS_PORT);
    const password = process.env.REDIS_PASSWORD;

    console.log("redis host: ",host)

    if (!host || !port || !password) {
        throw new Error(`Missing Redis environment variables:
            REDIS_HOST=${host}
            REDIS_PORT=${port}
            REDIS_PASSWORD=${password ? '***' : 'undefined'}`);
    }

    redisClient = createClient({
        username: 'default',
        password,
        socket: {
            host,
            port,
        }
    });

    redisClient.on('error', err => console.error('Redis Client Error', err));

    await redisClient.connect();
    console.log('✅ Redis connected successfully');
}

export function getRedisClient() {
    if (!redisClient) {
        throw new Error('Redis client not initialized. Call initRedis() first.');
    }
    return redisClient;
}
