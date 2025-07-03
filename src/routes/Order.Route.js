const {
  createOrder,
  getOrderHistory,
} = require("../controllers/OrderController");
const { verifyToken } = require("../middlewares/Auth");
const express = require("express");

const router = express();

router.post("/create-order", verifyToken, createOrder);
router.post("/order-history", verifyToken, getOrderHistory);

module.exports = router;
