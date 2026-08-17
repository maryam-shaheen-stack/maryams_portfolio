import mongoose from "mongoose";

/** Singleton document — one record holding all social/contact links. */
const socialSchema = new mongoose.Schema(
  {
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    email: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Social", socialSchema);
