const router = require("express").Router();
const authRoutes = require("./modules/auth/routes");
const noteRoutes = require("./modules/notes/routes");
const authenticator = require("./middleware/auth");

router.use("/auth", authRoutes);
router.use("/notes", authenticator, noteRoutes);

module.exports = router;
