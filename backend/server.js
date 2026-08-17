import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./src/config/db.js";
import app from "./src/app.js";

// Local dev only (`npm run dev` / `npm start`) — on Vercel, src/app.js's
// default export is used directly as the Function; app.listen() never
// runs there. connectDB() here is just for a clean startup log; the
// app also connects lazily via its own middleware either way.
const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
  } catch (err) {
    console.error("[server] Could not connect to MongoDB on startup — check MONGODB_URI in .env.");
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`[server] Maryam Portfolio API running on http://localhost:${PORT}`);
  });
}

start();
