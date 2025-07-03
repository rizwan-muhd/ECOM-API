const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/Database");
const { Category } = require("../models/Category.Model");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.STRING,
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
});

Product.belongsTo(Category, { foreignKey: "categoryId", onDelete: "SET NULL" });
Category.hasMany(Product, { foreignKey: "categoryId" });

module.exports = Product;
