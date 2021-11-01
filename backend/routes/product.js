const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, productDetail } = require("../controllers/product");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(isAuthenticatedUser, getAllProducts);
router.route("/").post(createProduct);
router.route("/:id").put(updateProduct).delete(deleteProduct).get(productDetail);

module.exports = router;