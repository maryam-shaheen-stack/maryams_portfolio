import jwt from "jsonwebtoken";

/**
 * Protects any route it's attached to. Expects `Authorization: Bearer <token>`.
 * On success, attaches the decoded payload (adminId, email) to req.admin.
 *
 * Usage: router.post("/", requireAuth, async (req, res) => { ... })
 */
export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Missing or malformed Authorization header." });
  }

  if (!process.env.JWT_SECRET) {
    console.error("[auth] JWT_SECRET is not set in .env");
    return res.status(500).json({ error: "Server auth is not configured." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}
