const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const userRoutes = require("./routes/User.Routes");
const categoryRoutes = require("./routes/Category.Route");
const productRoutes = require("./routes/Product.Routes");
const cartRoutes = require("./routes/Cart.Routes");
const orderRoutes = require("./routes/Order.Route");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

dotenv.config();
const { connectDB } = require("./Config/Database");

const PORT = process.env.PORT || 8001;

const app = express();
connectDB();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orderRoutes", orderRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});

module.exports = app;
