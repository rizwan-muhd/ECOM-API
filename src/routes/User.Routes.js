const { RegisterUser, loginUser } = require("../controllers/User.Controller");
const { validateSignup } = require("../middlewares/Auth Validation");
const express = require("express");

const router = express();

router.post("/register", RegisterUser);
router.post("/login", loginUser);

module.exports = router;
