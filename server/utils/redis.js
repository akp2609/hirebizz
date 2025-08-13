import { createClient } from 'redis';

const redisClient = createClient({

    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        tls: true
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

console.log("REDIS_HOST:", process.env.REDIS_HOST);
console.log("REDIS_PORT:", process.env.REDIS_PORT);

await redisClient.connect();

export default redisClient;
