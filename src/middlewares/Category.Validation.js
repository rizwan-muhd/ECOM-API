const { body, validationResult } = require("express-validator");

const validateCategory = [
  body("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isString()
    .withMessage("Category name must be a string"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateCategory };
