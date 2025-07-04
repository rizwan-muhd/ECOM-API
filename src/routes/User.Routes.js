const { RegisterUser, loginUser } = require("../controllers/User.Controller");
const {
  validateSignup,
  validateLogin,
} = require("../middlewares/Auth Validation");
const express = require("express");

const router = express();

router.post("/register", validateSignup, RegisterUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;
