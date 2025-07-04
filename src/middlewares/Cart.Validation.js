const { body, validationResult } = require("express-validator");

const validateCart = [
  body("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isUUID()
    .withMessage("Product ID must be a valid UUID"),

  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateCart };
