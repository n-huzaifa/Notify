function validator(schema) {
  return async function (req, res, next) {
    try {
      const data = req.body;
      const { value, error } = schema.validate(data || {});

      if (error) {
        next({ status: 403, message: error.details });
      }
      req.body = value;
      return next();
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  };
}

module.exports = validator;
