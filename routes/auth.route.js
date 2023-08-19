const authController = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

router.route("/auth/signup").post(authController.signup);
router.route("/auth/signin").post(authController.signin);

module.exports = router;
