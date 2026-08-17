import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * There is only ever one (or a small handful of) admin accounts — this is
 * a personal portfolio, not a multi-tenant app. Password is always stored
 * hashed, never in plain text.
 */
const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

adminSchema.methods.comparePassword = function comparePassword(plainPassword) {
  return bcrypt.compare(plainPassword, this.passwordHash);
};

adminSchema.statics.hashPassword = function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, 10);
};

export default mongoose.model("Admin", adminSchema);
