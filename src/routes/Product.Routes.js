const express = require("express");
const multer = require("multer");
const storage = require("../middlewares/MulterStorage");
const { verifyToken, verifyAdmin } = require("../middlewares/Auth");
const { validateProduct } = require("../middlewares/Product.validations");
const {
  createProduct,
  getAllProducts,
  UpdateProduct,
  deleteProduct,
} = require("../controllers/ProductController");

const router = express();
const upload = multer({ storage });

router.post(
  "/create-product",
  verifyToken,
  verifyAdmin,
  upload.single("image"),
  validateProduct,
  createProduct
);
router.get("/get-products", verifyToken, getAllProducts);
router.put(
  "/update-product/:id",
  verifyToken,
  verifyAdmin,
  upload.single("image"),
  validateProduct,
  UpdateProduct
);
router.delete("/delete-product", verifyToken, verifyAdmin, deleteProduct);

module.exports = router;
