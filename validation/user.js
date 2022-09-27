const joi = require("joi");

const signupSchema = joi.object().keys({
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
});

const loginSchema = joi.object().keys({
  email: joi.string().required(),
  password: joi.string().required(),
});

module.exports = { signupSchema, loginSchema };
