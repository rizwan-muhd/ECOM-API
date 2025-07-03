const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/Database");
const { Category } = require("../models/Category.Model");

export const Product = sequelize.define("Product", {
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
Category.hasMAny(Product, { foreignKey: "categoryId" });
