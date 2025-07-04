const { body, validationResult } = require("express-validator");

const validateOrder = [
  body("shippingAddress")
    .notEmpty()
    .withMessage("Shipping address is required")
    .isString()
    .withMessage("Shipping address must be a string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateOrder };
