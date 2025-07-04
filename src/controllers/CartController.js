const Cart = require("../models/cart.model");
const Product = require("../models/Product.Model");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    // Fetch current product price
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existing = await Cart.findOne({ where: { userId, productId } });

    if (existing) {
      // Only update quantity, not the price
      existing.quantity += qty;
      await existing.save();
    } else {
      // Save product price at the time of adding
      await Cart.create({
        userId,
        productId,
        quantity: qty,
        priceAtAddTime: product.price, // 👈 persist current price here
      });
    }

    res.json({ message: "Added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
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
