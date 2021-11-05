const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, productDetail, productReview } = require("../controllers/product");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(isAuthenticatedUser, authorizeRoles("admin"), getAllProducts);
router.route("/admin").post(authorizeRoles("admin"), createProduct);
router.route("/:id/admin").put(authorizeRoles("admin"), updateProduct).delete(authorizeRoles("admin"), deleteProduct);
router.route("/:id").get(productDetail);
router.route("/review").put(isAuthenticatedUser, productReview);

module.exports = router;