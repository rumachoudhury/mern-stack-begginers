// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";

// import dotenv from "dotenv";

// dotenv.config();

// // create a ratelimiter that allows 100 requests per minute
// const ratelimit = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.slidingWindow(100, "60 s"),
// });

// export default ratelimit;
// ------------------
import { Ratelimit } from "@upstash/ratelimit";

import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config(); // make sure this is at the top

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Create a rate limiter
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "60 s"),
});

export default ratelimit;
