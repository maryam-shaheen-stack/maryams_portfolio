import { Router } from "express";
import Personal from "../models/Personal.js";
import { requireAuth } from "../middleware/auth.js";
import { uploadImage, uploadPdf } from "../middleware/upload.js";
import { uploadBufferToCloudinary, destroyCloudinaryAsset } from "../utils/cloudinaryUpload.js";

const router = Router();

// Singleton — always return the one Personal document.
router.get("/", async (req, res, next) => {
  try {
    const doc = await Personal.findOne();
    if (!doc) {
      return res.status(404).json({
        error: "Personal content not found — run `npm run seed` in backend/ first.",
      });
    }
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

// Admin-only. Updates the one Personal document — pass any subset of
// fields (hero, about, contact, footer, name, firstName, lastName).
// `cv` is intentionally not editable here; it's set by the upload route.
router.put("/", requireAuth, async (req, res, next) => {
  try {
    const { cv, ...editable } = req.body || {};
    const doc = await Personal.findOneAndUpdate(
      {},
      { $set: editable },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

// Admin-only. Uploads (or replaces) the hero profile photo.
// Form field must be named "photo".
router.post("/photo", requireAuth, uploadImage.single("photo"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded (form field must be named 'photo')." });
    }

    const doc = await Personal.findOne();
    if (!doc) {
      return res.status(404).json({
        error: "Personal content not found — run `npm run seed` in backend/ first.",
      });
    }

    const { url, publicId } = await uploadBufferToCloudinary(req.file.buffer, {
      folder: "portfolio/personal",
      resourceType: "image",
    });

    const oldPublicId = doc.hero.photoPublicId;
    doc.hero.photo = url;
    doc.hero.photoPublicId = publicId;
    await doc.save();

    if (oldPublicId) await destroyCloudinaryAsset(oldPublicId, "image");

    res.json(doc);
  } catch (err) {
    next(err);
  }
});

// Admin-only. Uploads (or replaces) the CV PDF. Form field must be
// named "cv".
router.post("/cv", requireAuth, uploadPdf.single("cv"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF uploaded (form field must be named 'cv')." });
    }

    const doc = await Personal.findOne();
    if (!doc) {
      return res.status(404).json({
        error: "Personal content not found — run `npm run seed` in backend/ first.",
      });
    }

    const { url, publicId } = await uploadBufferToCloudinary(req.file.buffer, {
      folder: "portfolio/cv",
      resourceType: "raw",
    });

    const oldPublicId = doc.cv?.publicId;
    doc.cv = { url, publicId, originalName: req.file.originalname, uploadedAt: new Date() };
    await doc.save();

    if (oldPublicId) await destroyCloudinaryAsset(oldPublicId, "raw");

    res.json(doc);
  } catch (err) {
    next(err);
  }
});

// Admin-only. Removes the CV entirely (e.g. to take the download link
// down temporarily) without needing to upload a replacement.
router.delete("/cv", requireAuth, async (req, res, next) => {
  try {
    const doc = await Personal.findOne();
    if (!doc) {
      return res.status(404).json({
        error: "Personal content not found — run `npm run seed` in backend/ first.",
      });
    }

    const oldPublicId = doc.cv?.publicId;
    doc.cv = { url: "", publicId: "", originalName: "", uploadedAt: null };
    await doc.save();

    if (oldPublicId) await destroyCloudinaryAsset(oldPublicId, "raw");

    res.json(doc);
  } catch (err) {
    next(err);
  }
});

export default router;
