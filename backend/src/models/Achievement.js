import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    order: { type: Number, required: true, default: 0 },
    icon: { type: String, default: "" }, // emoji, kept editable as plain text
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Achievement", achievementSchema);
