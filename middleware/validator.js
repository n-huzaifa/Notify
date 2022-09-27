function validator(schema) {
  return async function (req, res, next) {
    try {
      const { value, error } = schema.validate(req.body || {});

      if (error) {
        res.status(403).json({ error: error.details });
      }
      req.body = value;
      return next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = validator;
