import { Router } from "express";
import SkillStackItem from "../models/SkillStackItem.js";
import { requireAuth } from "../middleware/auth.js";

// SkillStackItem has no unique slug field (frontend uses plain `name`),
// so it's addressed by MongoDB's own _id instead — a small custom router
// rather than makeListRouter's slug-lookup shape.
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const docs = await SkillStackItem.find().sort({ order: 1 });
    res.json(docs);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const body = { ...req.body };
    if (body.order === undefined) {
      body.order = await SkillStackItem.countDocuments();
    }
    const doc = await SkillStackItem.create(body);
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const doc = await SkillStackItem.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ error: "SkillStackItem not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const doc = await SkillStackItem.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "SkillStackItem not found" });
    res.json({ deleted: true, id: req.params.id });
  } catch (err) {
    next(err);
  }
});

router.patch("/reorder", requireAuth, async (req, res, next) => {
  try {
    const updates = req.body?.order;
    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({ error: "Body must be { order: [{ id, order }, ...] }" });
    }
    await Promise.all(
      updates.map(({ id, order }) =>
        SkillStackItem.updateOne({ _id: id }, { $set: { order } })
      )
    );
    const docs = await SkillStackItem.find().sort({ order: 1 });
    res.json(docs);
  } catch (err) {
    next(err);
  }
});

export default router;
