import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { destroyCloudinaryAsset } from "../utils/cloudinaryUpload.js";

/**
 * Builds a full read/write router for a "list of documents, sorted by
 * `order`" collection — which is most of the resources here (Project,
 * SkillCategory, Experience, Education, ...).
 *
 * GET routes stay public (the live site needs them). POST/PUT/DELETE/
 * reorder are all behind requireAuth — only a logged-in admin can use
 * them.
 */
export function makeListRouter(Model, { filterableFields = [] } = {}) {
  const router = Router();

  // ---- Public reads ----

  router.get("/", async (req, res, next) => {
    try {
      const filter = {};
      for (const field of filterableFields) {
        if (req.query[field] !== undefined) {
          const raw = req.query[field];
          filter[field] = raw === "true" ? true : raw === "false" ? false : raw;
        }
      }
      const docs = await Model.find(filter).sort({ order: 1 });
      res.json(docs);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:slug", async (req, res, next) => {
    try {
      const doc = await Model.findOne({ slug: req.params.slug });
      if (!doc) return res.status(404).json({ error: `${Model.modelName} not found` });
      res.json(doc);
    } catch (err) {
      next(err);
    }
  });

  // ---- Admin-only writes ----

  // Create. If no `order` is given, defaults to "end of the list" so new
  // items don't all pile up at position 0.
  router.post("/", requireAuth, async (req, res, next) => {
    try {
      const body = { ...req.body };
      if (body.order === undefined) {
        const count = await Model.countDocuments();
        body.order = count;
      }
      const doc = await Model.create(body);
      res.status(201).json(doc);
    } catch (err) {
      next(err);
    }
  });

  // Update by slug. Slug itself can be changed in the body; the URL
  // param is just how we find the existing doc.
  router.put("/:slug", requireAuth, async (req, res, next) => {
    try {
      const doc = await Model.findOneAndUpdate(
        { slug: req.params.slug },
        { $set: req.body },
        { new: true, runValidators: true }
      );
      if (!doc) return res.status(404).json({ error: `${Model.modelName} not found` });
      res.json(doc);
    } catch (err) {
      next(err);
    }
  });

  // Delete by slug. Also cleans up the Cloudinary image, for resources
  // that have one (Project, Certification) — a no-op for resources that
  // don't (destroyCloudinaryAsset skips silently if there's no publicId).
  router.delete("/:slug", requireAuth, async (req, res, next) => {
    try {
      const doc = await Model.findOneAndDelete({ slug: req.params.slug });
      if (!doc) return res.status(404).json({ error: `${Model.modelName} not found` });
      if (doc.imagePublicId) {
        await destroyCloudinaryAsset(doc.imagePublicId, "image");
      }
      res.json({ deleted: true, slug: req.params.slug });
    } catch (err) {
      next(err);
    }
  });

  // Bulk reorder — body: { order: [{ slug, order }, ...] }. Used by the
  // admin's drag-to-reorder UI to save every row's new position at once.
  router.patch("/reorder", requireAuth, async (req, res, next) => {
    try {
      const updates = req.body?.order;
      if (!Array.isArray(updates) || updates.length === 0) {
        return res.status(400).json({ error: "Body must be { order: [{ slug, order }, ...] }" });
      }
      await Promise.all(
        updates.map(({ slug, order }) =>
          Model.updateOne({ slug }, { $set: { order } })
        )
      );
      const docs = await Model.find().sort({ order: 1 });
      res.json(docs);
    } catch (err) {
      next(err);
    }
  });

  return router;
}
