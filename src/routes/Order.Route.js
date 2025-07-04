const {
  createOrder,
  getOrderHistory,
} = require("../controllers/OrderController");
const { verifyToken } = require("../middlewares/Auth");
const { validateOrder } = require("../middlewares/Order.Validation");
const express = require("express");

const router = express();

router.post("/create-order", validateOrder, verifyToken, createOrder);
router.post("/order-history", verifyToken, getOrderHistory);

module.exports = router;
