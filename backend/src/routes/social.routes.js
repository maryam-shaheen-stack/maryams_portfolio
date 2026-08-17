import { Router } from "express";
import Social from "../models/Social.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const doc = await Social.findOne();
    if (!doc) {
      return res.status(404).json({
        error: "Social links not found — run `npm run seed` in backend/ first.",
      });
    }
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

// Admin-only. Updates github/linkedin/email.
router.put("/", requireAuth, async (req, res, next) => {
  try {
    const doc = await Social.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

export default router;
