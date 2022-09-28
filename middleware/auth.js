require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticator(req, res, next) {
  try {
    const token =
      req.body.token || req.headers["x-access-token"] || req.body.query;

    if (!token) {
      next({ status: 404, message: "JWT Token required" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    next({ status: 500, message: error.message });
  }
}

module.exports = authenticator;
