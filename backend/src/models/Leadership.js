import mongoose from "mongoose";

const leadershipSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    order: { type: Number, required: true, default: 0 },
    role: { type: String, required: true },
    org: { type: String, default: "" },
    period: { type: String, default: "" },
    description: { type: String, default: "" },
    responsibilities: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Leadership", leadershipSchema);
