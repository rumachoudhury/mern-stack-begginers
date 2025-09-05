import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // const { success } = await rateLimit.limit(`userId:${req.user.id}`);
    const { success } = await rateLimit.limit(`ip:${req.ip}`);
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }
    next();
  } catch (error) {
    console.log("Rate limiter error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default rateLimiter;
// -------
// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";

// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN,
// });

// const ratelimit = new Ratelimit({
//   redis,
//   limiter: Ratelimit.slidingWindow(100, "60 s"),
// });

// export default async function rateLimiter(req, res, next) {
//   try {
//     const limit = await ratelimit.limit(req.ip); // using IP as key
//     if (!limit.success) {
//       return res.status(429).json({ message: "Too many requests" });
//     }
//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// }
