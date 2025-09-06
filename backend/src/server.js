import express from "express";
import connectDB from "./config/db.js";
import messageRoutes from "./routes/messageRoutes.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
// const _dirname = path.resolve();

// Recreate __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

// Middleware to parse JSON bodies
app.use(express.json());

app.use(rateLimiter);

app.use("/api/message", messageRoutes);

// app.use(express.static(path.join(__dirname, "../frontend/dist")));

// if (process.env.NODE_ENV === "production") {
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

// Serve frontend build
// const frontendPath = path.join(__dirname, "../frontend/dist");
// app.use(express.static(frontendPath));

// if (process.env.NODE_ENV === "production") {
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(frontendPath, "index.html"));
//   });
// }

app.use(express.static(path.join(__dirname, "../frontend/dist")));

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

//First connect to DB then start the server and this is good practice because if DB connection fails server will not start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

//what is endpoint
// An endpoint is a specific URL where an API can be accessed by a client application.
