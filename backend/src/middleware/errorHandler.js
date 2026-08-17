/** Catches anything passed to next(err) from any route and returns a
 * consistent JSON error shape instead of Express's default HTML page. */
export function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error("[error]", err);

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ error: `Invalid ${err.path}: ${err.value}` });
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    return res.status(409).json({ error: `${field} already exists` });
  }
  // Multer file-size/type errors (e.g. LIMIT_FILE_SIZE) and our own
  // fileFilter rejections both land here.
  if (err.name === "MulterError") {
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }

  res.status(err.status || 500).json({
    error: err.message || "Something went wrong on the server.",
  });
}

export function notFoundHandler(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}
