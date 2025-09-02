import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // const { success } = await rateLimit.limit(`userId:${req.user.id}`);
    const { success } = await rateLimit.limit(`ip:${req.ip}`);
    if (!success) {
      return res
        .status(429)
        .set("Retry-After", "60")
        .json({ message: "Too many requests, please try again later." });
    }
    next();
  } catch (error) {
    console.log("Rate limiter error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default rateLimiter;
