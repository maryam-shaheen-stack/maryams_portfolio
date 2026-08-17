import mongoose from "mongoose";

const researchSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    order: { type: Number, required: true, default: 0 },
    title: { type: String, required: true },
    type: { type: String, default: "" },
    venue: { type: String, default: "" },
    status: { type: String, default: "" },
    team: { type: [String], default: [] },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Research", researchSchema);
