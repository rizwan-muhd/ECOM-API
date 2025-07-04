const {
  addToCart,
  viewCart,
  removeFromCart,
} = require("../controllers/CartController");
const { verifyToken } = require("../middlewares/Auth");
const { validateCart } = require("../middlewares/Cart.Validation");
const express = require("express");

const router = express();

router.post("/add-to-cart", validateCart, verifyToken, addToCart);
router.post("/view-cart", verifyToken, viewCart);
router.post("/remove-from -cart", verifyToken, removeFromCart);

module.exports = router;
