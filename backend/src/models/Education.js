import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    order: { type: Number, required: true, default: 0 },
    degree: { type: String, required: true },
    institution: { type: String, default: "" },
    status: { type: String, default: "" },
    areas: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Education", educationSchema);
