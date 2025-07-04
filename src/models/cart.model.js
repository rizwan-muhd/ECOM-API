const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/Database");
const { User } = require("./User.model");
const Product = require("./Product.Model");

const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  priceAtAddTime: DataTypes.FLOAT,
});

Cart.belongsTo(User, { foreignKey: "userId" });
Cart.belongsTo(Product, { foreignKey: "productId" });

module.exports = Cart;
