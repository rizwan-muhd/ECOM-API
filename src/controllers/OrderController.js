const Cart = require("../models/cart.model");
const Product = require("../models/Product.Model");
const { Order } = require("../models/Order.Model");

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingAddress } = req.body;

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [Product],
    });

    if (!cartItems.length)
      return res.status(400).json({ message: "Cart is empty" });

    const products = cartItems.map((item) => ({
      productId: item.productId,
      name: item.Product.name,
      price: item.Product.price,
      quantity: item.quantity,
    }));

    const totalAmount = products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );

    const order = await Order.create({
      userId,
      products,
      totalAmount,
      shippingAddress,
    });

    // Clear the cart
    await Cart.destroy({ where: { userId } });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

module.exports = { createOrder, getOrderHistory };
