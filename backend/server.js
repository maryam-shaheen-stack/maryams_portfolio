import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./src/config/db.js";
import { createApp } from "./src/expressApp.js";

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`[server] Maryam Portfolio API running on http://localhost:${PORT}`);
  });
}

start();
