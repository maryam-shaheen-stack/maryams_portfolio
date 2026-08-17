import mongoose from "mongoose";

/**
 * Singleton document — there is only ever one Personal record. Holds all
 * site-wide copy (hero, about, contact, footer) plus the CV file
 * reference. `cv` is populated by the Part 3 upload route; it stays
 * null/empty until the admin uploads a PDF via the dashboard.
 */
const personalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    hero: {
      headline: { type: String, default: "" },
      tagline: { type: String, default: "" },
      intro: { type: String, default: "" },
      photo: { type: String, default: "" }, // Cloudinary URL once uploaded
      photoPublicId: { type: String, default: "" },
    },

    about: {
      paragraphs: { type: [String], default: [] },
      focus: { type: [String], default: [] },
      education: { type: String, default: "" },
    },

    contact: {
      heading: { type: String, default: "" },
      subheading: { type: String, default: "" },
      email: { type: String, default: "" },
    },

    footer: {
      tagline: { type: String, default: "" },
      copyright: { type: String, default: "" },
    },

    // Populated once the admin uploads a CV via the dashboard (Part 3).
    cv: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
      originalName: { type: String, default: "" },
      uploadedAt: { type: Date, default: null },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Personal", personalSchema);
