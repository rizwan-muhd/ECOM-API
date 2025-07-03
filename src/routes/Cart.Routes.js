const {
  addToCart,
  viewCart,
  removeFromCart,
} = require("../controllers/CartController");
const { verifyToken, verifyAdmin } = require("../middlewares/Auth");
const express = require("express");

const router = express();

router.post("/add-to-cart", verifyToken, addToCart);
router.post("/view-cart", verifyToken, viewCart);
router.post("/remove-from -cart", verifyToken, removeFromCart);

module.exports = router;
