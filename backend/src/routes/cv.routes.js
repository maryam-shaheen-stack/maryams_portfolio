import { Router } from "express";
import Personal from "../models/Personal.js";

const router = Router();

// Metadata about the current CV (filename, upload date) — used by the
// admin dashboard to show what's currently live.
router.get("/", async (req, res, next) => {
  try {
    const doc = await Personal.findOne();
    res.json(doc?.cv ?? { url: "", originalName: "", uploadedAt: null });
  } catch (err) {
    next(err);
  }
});

// The actual "Download CV" button on the frontend hits this — redirects
// straight to the Cloudinary-hosted PDF once one has been uploaded
// (Part 3). Until then it 404s with a clear message instead of a broken
// link.
router.get("/download", async (req, res, next) => {
  try {
    const doc = await Personal.findOne();
    if (!doc?.cv?.url) {
      return res.status(404).json({ error: "No CV has been uploaded yet." });
    }
    res.redirect(doc.cv.url);
  } catch (err) {
    next(err);
  }
});

export default router;
