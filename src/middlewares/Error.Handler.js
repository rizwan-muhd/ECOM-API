const errorHandler = (err, req, res, next) => {
  console.error("Caught error:", err);

  // Fallback error response
  res.status(err?.status.code || 500).json({
    success: false,
    message: err?.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
