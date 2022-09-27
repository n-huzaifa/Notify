require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticator(req, res, next) {
  const token =
    req.body.token || req.header["x-access-token"] || req.body.query;
  //  TODO setup JWT Auth verification middleware
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded) return next();
}

module.exports = authenticator;
