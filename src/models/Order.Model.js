const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/Database");
const { User } = require("./User.model");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  products: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  shippingAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "paid", "shipped", "cancelled"),
    defaultValue: "pending",
  },
});

Order.belongsTo(User, { foreignKey: "userId" });

module.exports = { Order };
