import mongoose from "mongoose";

const skillCategorySchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    label: { type: String, required: true },
    order: { type: Number, required: true, default: 0 },
    skills: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("SkillCategory", skillCategorySchema);
