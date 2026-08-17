import mongoose from "mongoose";

const skillStackItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    detail: { type: String, default: "" },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("SkillStackItem", skillStackItemSchema);
