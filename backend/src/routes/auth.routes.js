import { Router } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const TOKEN_EXPIRY = "7d";

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required." });
    }
    if (!process.env.JWT_SECRET) {
      console.error("[auth] JWT_SECRET is not set in .env");
      return res.status(500).json({ error: "Server auth is not configured." });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const valid = await admin.comparePassword(password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign(
      { adminId: admin._id.toString(), email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    res.json({
      token,
      admin: { id: admin._id, email: admin.email, name: admin.name },
    });
  } catch (err) {
    next(err);
  }
});

// Lets the admin frontend verify a stored token is still valid on page load,
// and re-fetch the admin's own info without re-sending the password.
router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.adminId).select("-passwordHash");
    if (!admin) return res.status(404).json({ error: "Admin not found." });
    res.json({ admin });
  } catch (err) {
    next(err);
  }
});

export default router;
