const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "ecom",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "password@2025",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    port: Number(process.env.DB_PORT) || 5432,
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected To PostgressSQL Successfully");
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.log("Connection Error", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
