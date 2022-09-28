function ErrorHandler(error, req, res, next) {
  res
    .status(error.status || 500)
    .json({ error: error.message || "Internal Server Error" });
  next();
}

module.exports = ErrorHandler;
