import { requireAuth } from "../../middleware/auth.js";
import { uploadImage } from "../../middleware/upload.js";
import { uploadBufferToCloudinary, destroyCloudinaryAsset } from "../../utils/cloudinaryUpload.js";

/**
 * Adds `POST /:slug/image` to a router built from makeListRouter, for
 * any Model that has `image` / `imagePublicId` fields (Project,
 * Certification). Uploads the new image first, only deletes the old
 * Cloudinary asset once the new one is confirmed saved.
 */
export function attachImageUploadRoute(router, Model, { folder }) {
  router.post(
    "/:slug/image",
    requireAuth,
    uploadImage.single("image"),
    async (req, res, next) => {
      try {
        if (!req.file) {
          return res
            .status(400)
            .json({ error: "No image file uploaded (form field must be named 'image')." });
        }

        const doc = await Model.findOne({ slug: req.params.slug });
        if (!doc) return res.status(404).json({ error: `${Model.modelName} not found` });

        const { url, publicId } = await uploadBufferToCloudinary(req.file.buffer, {
          folder,
          resourceType: "image",
        });

        const oldPublicId = doc.imagePublicId;
        doc.image = url;
        doc.imagePublicId = publicId;
        await doc.save();

        if (oldPublicId) await destroyCloudinaryAsset(oldPublicId, "image");

        res.json(doc);
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
}
