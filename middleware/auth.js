require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticator(req, res, next) {
  try {
    const token =
      req.body.token || req.headers["x-access-token"] || req.body.query;

    if (!token) {
      res.status(403).json({ error: "JWT Token required" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = authenticator;
