const express = require("express");
const { newOrder, getOrderDetail, myOrder } = require("../controllers/order");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(isAuthenticatedUser, authorizeRoles("admin"), newOrder).get(isAuthenticatedUser, authorizeRoles("admin"), myOrder);
router.route("/:id").post(isAuthenticatedUser, authorizeRoles("admin"), getOrderDetail);

module.exports = router;