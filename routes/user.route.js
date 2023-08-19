const userController = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authJwt");
const { ROLE } = require("../constants");


router.route("/users").post(userController.create);

router.route("/users").get(userController.findAll);
router.route("/user/me").get(auth.isAuthenticatedUser, userController.getUserWhenIsAuthen)

module.exports = router;
