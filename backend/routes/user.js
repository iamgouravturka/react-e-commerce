const express = require("express");
const { register, login, logout, forgotPassword, resetPassword, getMyProfile, updatePassword, updateProfile, getUserDetail, updateRole, deleteUser } = require("../controllers/user");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgot").post(forgotPassword);
router.route("/reset/:token").put(resetPassword);
router.route("/logout").get(logout);

router.route("/").get(isAuthenticatedUser, getMyProfile);
router.route("/updatePassword").get(isAuthenticatedUser, updatePassword);
router.route("/").get(isAuthenticatedUser, updateProfile);

router.route("/:id/admin").get(authorizeRoles("admin"), isAuthenticatedUser, getUserDetail)
    .put(authorizeRoles("admin"), isAuthenticatedUser, updateRole)
    .delete(authorizeRoles("admin"), isAuthenticatedUser, deleteUser);
router.route("/admin").get(authorizeRoles("admin"), isAuthenticatedUser, getAllUsers);

module.exports = router;