const joi = require("joi");

const noteSchema = joi.object().keys({
  title: joi.string().required(),
  content: joi.string().required(),
});

module.exports = { noteSchema };
