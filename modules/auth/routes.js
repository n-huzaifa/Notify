const router = require("express").Router();
const validator = require("../../middleware/validator");
const { signupController, loginController } = require("./controller");
const { signupSchema, loginSchema } = require("../../validation/user");

router.post("/signup", validator(signupSchema), signupController);
router.post("/login", validator(loginSchema), loginController);

module.exports = router;
