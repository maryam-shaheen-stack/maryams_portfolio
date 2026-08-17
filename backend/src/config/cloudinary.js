import { v2 as cloudinary } from "cloudinary";

/**
 * Configures the Cloudinary SDK from env vars. Called once, lazily, the
 * first time an upload route actually needs it — so the server can still
 * boot and serve every other route even if Cloudinary isn't set up yet.
 */
let configured = false;

export function getCloudinary() {
  if (!configured) {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      const err = new Error(
        "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend/.env."
      );
      err.status = 500;
      throw err;
    }

    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
    configured = true;
  }
  return cloudinary;
}
