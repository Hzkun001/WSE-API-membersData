export function errorHandler(err, req, res, next) {
  console.error("[ERROR]", err);
  if (res.headersSent) return next(err);
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Internal Server Error"
  });
}
