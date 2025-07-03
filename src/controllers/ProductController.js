const Product = require("../models/Product.Model");
const { Category } = require("../models/Category.Model");
const { Op } = require("sequelize");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;
    const imageUrl = req.file?.path;
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      categoryId,
      imageUrl,
    });
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const {
      minPrice,
      maxPrice,
      categoryId,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    if (minPrice || maxPrice) {
      where.price = {
        ...(minPrice && { [Op.gte]: parseFloat(minPrice) }),
        ...(maxPrice && { [Op.lte]: parseFloat(maxPrice) }),
      };
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search && search.trim() !== "") {
      where.name = {
        [Op.iLike]: `%${search}%`,
      };
    }

    const { count, rows } = await Product.findAndCountAll({
      where,
      include: [{ model: Category, attributes: ["id", "name"] }],
      offset: Number(offset),
      limit: Number(limit),
      order: [["createdAt", "DESC"]],
    });

    res.json({
      total: count,
      page: Number(page),
      pages: Math.ceil(count / limit),
      products: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, description, price, stock, categoryId } = req.body;
    const imageUrl = req.file?.path || product.imageUrl;

    await product.update({
      name,
      description,
      price,
      stock,
      categoryId,
      imageUrl,
    });

    res.json({ message: "Product updated", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  UpdateProduct,
  deleteProduct,
};
