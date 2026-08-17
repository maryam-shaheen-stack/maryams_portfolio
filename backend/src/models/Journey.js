import mongoose from "mongoose";

const journeySchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    order: { type: Number, required: true, default: 0 },
    period: { type: String, default: "" },
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Journey", journeySchema);
