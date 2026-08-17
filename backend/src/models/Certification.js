import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    order: { type: Number, required: true, default: 0 },
    title: { type: String, required: true },
    organization: { type: String, default: "" },
    date: { type: String, default: "" },
    image: { type: String, default: "" }, // Cloudinary URL
    imagePublicId: { type: String, default: "" },
    credentialUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Certification", certificationSchema);
