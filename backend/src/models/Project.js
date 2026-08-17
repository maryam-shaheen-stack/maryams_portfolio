import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    order: { type: Number, required: true, default: 0 },
    year: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    title: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    fullDescription: { type: String, default: "" },
    category: { type: String, default: "" },
    technologies: { type: [String], default: [] },
    image: { type: String, default: "" }, // Cloudinary URL
    imagePublicId: { type: String, default: "" },
    video: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
