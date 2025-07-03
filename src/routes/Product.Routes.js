const express = require("express");
const multer = require("multer");
const storage = require("../middlewares/MulterStorage");
const { verifyToken, verifyAdmin } = require("../middlewares/Auth");
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
  createProduct
);
router.get("/get-products", verifyToken, getAllProducts);
router.put(
  "/update-product",
  verifyToken,
  verifyAdmin,
  upload.single("image"),
  UpdateProduct
);
router.delete("/delete-product", verifyToken, verifyAdmin, deleteProduct);

module.exports = router;
