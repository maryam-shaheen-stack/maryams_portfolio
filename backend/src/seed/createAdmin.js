import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";

/**
 * Creates (or updates the password of) the single admin account, using
 * ADMIN_EMAIL / ADMIN_PASSWORD from .env. Safe to re-run any time — e.g.
 * change ADMIN_PASSWORD in .env and re-run this to reset it.
 *
 * Usage: npm run seed:admin
 */
async function run() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error(
      "[seed:admin] Set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env first."
    );
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("[seed:admin] ADMIN_PASSWORD should be at least 8 characters.");
    process.exit(1);
  }

  await connectDB();

  const passwordHash = await Admin.hashPassword(password);
  const normalizedEmail = email.toLowerCase().trim();

  const admin = await Admin.findOneAndUpdate(
    { email: normalizedEmail },
    { email: normalizedEmail, passwordHash },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(`[seed:admin] Admin account ready: ${admin.email}`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("[seed:admin] Failed:", err);
  process.exit(1);
});
