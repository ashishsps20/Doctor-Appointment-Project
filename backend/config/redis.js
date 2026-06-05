import { createClient } from 'redis';
import 'dotenv/config'; // Taaki .env ki value yahan read ho sake


const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.log('❌ Redis Client Error:', err));
redisClient.on('connect', () => console.log('✅ Upstash Redis Connected Successfully! 🚀'));

const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        console.log("Redis connection failed:", error);
    }
};

connectRedis();

export default redisClient;