import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import apiRoutes from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

/**
 * This file is Vercel's official zero-config Express entrypoint — see
 * https://vercel.com/docs/frameworks/backend/express. Vercel scans for
 * exactly this path (`src/app.js`) and expects a default-exported
 * Express `app` instance; when it finds one, it wraps it as a single
 * Vercel Function automatically, no custom `api/` folder or
 * `vercel.json` routing needed.
 *
 * Because that means Vercel calls this app directly per-request (no
 * custom wrapper of our own connects to the database first), the DB
 * connection happens in a lazy middleware below instead — connectDB()
 * is cached (see config/db.js), so this is a no-op after the first
 * request on a warm instance.
 */

const app = express();

// Vercel sits in front of the function as a reverse proxy — without
// this, req.ip / req.protocol (used by CORS, rate limiting, secure
// cookies, etc.) reflect the proxy, not the real client.
app.set("trust proxy", 1);

const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, server-to-server).
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`));
      }
    },
  })
);

app.use(express.json());

// Ensure the DB is connected before any route touches it.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
