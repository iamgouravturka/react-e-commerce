const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/product");

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/").post(createProduct);
router.route("/:id").put(updateProduct);
router.route("/:id").delete(deleteProduct);

module.exports = router;