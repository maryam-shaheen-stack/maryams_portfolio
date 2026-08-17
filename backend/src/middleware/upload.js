import multer from "multer";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_PDF_BYTES = 10 * 1024 * 1024; // 10MB

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

/**
 * Both use memory storage (files land in req.file.buffer) — we stream
 * straight to Cloudinary, we never write uploads to disk.
 */

export const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_IMAGE_BYTES },
  fileFilter(req, file, cb) {
    if (!ALLOWED_IMAGE_TYPES.has(file.mimetype)) {
      const err = new Error("Only JPEG, PNG, WEBP, or GIF images are allowed.");
      err.status = 400;
      return cb(err);
    }
    cb(null, true);
  },
});

export const uploadPdf = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_PDF_BYTES },
  fileFilter(req, file, cb) {
    if (file.mimetype !== "application/pdf") {
      const err = new Error("Only PDF files are allowed.");
      err.status = 400;
      return cb(err);
    }
    cb(null, true);
  },
});
