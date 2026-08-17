import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    order: { type: Number, required: true, default: 0 },
    icon: { type: String, default: "" },
    title: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },
    deliverables: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
