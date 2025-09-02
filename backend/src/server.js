import express from "express";
import connectDB from "./config/db.js";
import messageRoutes from "./routes/messageRoutes.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

app.use(rateLimiter);

app.use("/api/message", messageRoutes);

//First connect to DB then start the server and this is good practice because if DB connection fails server will not start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

//what is endpoint
// An endpoint is a specific URL where an API can be accessed by a client application.
