import streamifier from "streamifier";
import { getCloudinary } from "../config/cloudinary.js";

/**
 * Uploads a buffer (from multer's memory storage) to Cloudinary by
 * piping it through an upload_stream — no temp files on disk.
 *
 * @param {Buffer} buffer
 * @param {object} opts
 * @param {string} opts.folder - Cloudinary folder, e.g. "portfolio/projects"
 * @param {"image"|"raw"} [opts.resourceType] - "raw" for PDFs, "image" for photos
 * @returns {Promise<{url: string, publicId: string}>}
 */
export function uploadBufferToCloudinary(buffer, { folder, resourceType = "image" }) {
  const cloudinary = getCloudinary();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (err, result) => {
        if (err) return reject(err);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

/**
 * Deletes a previous Cloudinary asset. Used when an image/CV is replaced,
 * so old files don't pile up in the Cloudinary account. Failures here are
 * logged but never block the request — a stray orphaned asset is a much
 * smaller problem than a failed save.
 */
export async function destroyCloudinaryAsset(publicId, resourceType = "image") {
  if (!publicId) return;
  try {
    const cloudinary = getCloudinary();
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (err) {
    console.error(`[cloudinary] Failed to delete asset ${publicId}:`, err.message);
  }
}
