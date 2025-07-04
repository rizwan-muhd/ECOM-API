const { body, validationResult } = require("express-validator");

const validateProduct = [
  body("name")
    .notEmpty()
    .withMessage("Product name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),

  body("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isUUID()
    .withMessage("Category ID must be a valid UUID"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateProduct,
};
