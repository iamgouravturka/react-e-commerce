const express = require("express");
const { getAllProducts } = require("../controllers/product");

const router = express.Router();

router.route("/").get(getAllProducts);

module.exports = router;