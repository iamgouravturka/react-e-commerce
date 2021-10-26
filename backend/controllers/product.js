const { successResponse } = require("../helper/response");
const Product = require("../models/product");

exports.getAllProducts = (req, res) => {
    res.status(200).json({message: "Route is working fine"});
}

exports.createProduct = async (req, res) => {

    const product = await Product.create(req.body);
    successResponse(res, product, 201);
}