const express = require("express");
const { register, login, logout, forgotPassword, resetPassword, getMyProfile } = require("../controllers/user");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgot").post(forgotPassword);
router.route("/reset/:token").put(resetPassword);
router.route("/logout").get(logout);

router.route("/").get(isAuthenticatedUser, getMyProfile);

module.exports = router;