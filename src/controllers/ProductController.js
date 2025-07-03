const { Product } = require("../models/Product.Model");

export const createProduct = async (req, res, next) => {
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
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
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

    // Apply name search
    if (search) {
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
    next(error);
  }
};

export const UpdateProduct = async (req, res, next) => {
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
    next(error);
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};
