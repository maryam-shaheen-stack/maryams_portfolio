import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    order: { type: Number, required: true, default: 0 },
    role: { type: String, required: true },
    org: { type: String, default: "" },
    period: { type: String, default: "" },
    description: { type: String, default: "" },
    technologies: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);
