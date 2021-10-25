const { successResponse, errorResponse } = require("../helper/response");
const Product = require("../models/product");

//All Product
exports.getAllProducts = async (req, res) => {
    
    const product = await Product.find();
    return successResponse(res, product);
}

//Create Product
exports.createProduct = async (req, res) => {

    const product = await Product.create(req.body);
    return successResponse(res, product, 201);
}

//Update Product
exports.updateProduct = async (req, res) => {

    const product = await Product.findById(req.params.id);

    if(!product) {
        return errorResponse(res, { message: "No product found " });
    }

    const result = await Product.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    return successResponse(res, result);
}

//Delete Product
exports.deleteProduct = async (req, res) => {

    const product = await Product.findById(req.params.id);

    if(!product) {
        return errorResponse(res, { message: "No product found " });
    }

    product.remove();

    return successResponse(res);
}