const ErrorHandler = require("../helper/errorHandler");
const { successResponse, errorResponse } = require("../helper/response");
const catchAyncError = require("../middleware/catchAyncError");
const Product = require("../models/product");
const ApiFeature = require("../helper/apiFeature");

//All Product
exports.getAllProducts = catchAyncError(async (req, res) => {
    
    const apiFeature = new ApiFeature(Product.find(), req.query).search();
    const product = await apiFeature.query;
    return successResponse(res, product);
});

//Create Product
exports.createProduct = catchAyncError(async (req, res) => {

    const product = await Product.create(req.body);
    return successResponse(res, product, 201);
});

//Update Product
exports.updateProduct = catchAyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler('No product found'))
    }

    const result = await Product.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    return successResponse(res, result);
});

//Delete Product
exports.deleteProduct = catchAyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler('No product found'))
    }

    product.remove();

    return successResponse(res);
});

//Product Detail
exports.productDetail = catchAyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler('No product found'))
    }

    return successResponse(res, product);
});