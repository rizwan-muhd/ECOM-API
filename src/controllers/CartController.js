const Cart = require("../models/cart.model");
const Product = require("../models/Product.Model");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const qty = parseInt(quantity, 10); // ✅ ensure it's a number

    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const existing = await Cart.findOne({ where: { userId, productId } });
    if (existing) {
      existing.quantity += qty;
      await existing.save();
    } else {
      await Cart.create({ userId, productId, quantity });
    }

    res.json({ message: "Added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

const viewCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [Product],
    });

    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

const removeFromCart = async () => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    await Cart.destroy({ where: { userId, productId } });

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

module.exports = { addToCart, viewCart, removeFromCart };
