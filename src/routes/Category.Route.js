const express = require("express");
const { verifyToken, verifyAdmin } = require("../middlewares/Auth");

const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getC,
} = require("../controllers/Category.Controller");

const router = express();

router.post("/create-category", verifyToken, verifyAdmin, createCategory);
router.get("/get-category", verifyToken, getAllCategories);
router.put("/update-category", verifyToken, verifyAdmin, updateCategory);
router.delete("/delete-category", verifyToken, verifyAdmin, deleteCategory);

module.exports = router;
