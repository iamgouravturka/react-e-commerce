const express = require("express");
const { register, login, logout, forgotPassword, resetPassword } = require("../controllers/user");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgot").post(forgotPassword);
router.route("/reset/:token").put(resetPassword);
router.route("/logout").get(logout);

module.exports = router;