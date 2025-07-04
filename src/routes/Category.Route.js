const express = require("express");
const { verifyToken, verifyAdmin } = require("../middlewares/Auth");
const { validateCategory } = require("../middlewares/Category.Validation");

const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/Category.Controller");

const router = express();

router.post(
  "/create-category",
  validateCategory,
  verifyToken,
  verifyAdmin,
  createCategory
);
router.get("/get-category", verifyToken, getAllCategories);
router.put(
  "/update-category/:id",
  validateCategory,
  verifyToken,
  verifyAdmin,
  updateCategory
);
router.delete("/delete-category/:id", verifyToken, verifyAdmin, deleteCategory);

module.exports = router;
