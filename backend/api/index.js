import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../src/config/db.js";
import { createApp } from "../src/expressApp.js";

// Vercel's Node runtime treats an exported Express app as a request
// handler directly — no app.listen() here (that's only for the plain
// `node server.js` / `npm run dev` local path). The DB connection is
// established (or reused, see db.js) on first request per warm
// instance rather than at import time, since a serverless module can
// be loaded before env vars are guaranteed to be ready.
const app = createApp();

export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}
