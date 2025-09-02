import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import dotenv from "dotenv";

dotenv.config();

// Create a new Redis client using environment variables
const redis = Redis.fromEnv();

// Create a new rate limiter, that allows 100 requests per 60 seconds
const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"),
});
export default rateLimit;
