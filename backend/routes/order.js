const express = require("express");
const { newOrder } = require("../controllers/order");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(isAuthenticatedUser, newOrder);

module.exports = router;