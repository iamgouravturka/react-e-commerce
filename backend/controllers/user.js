const ErrorHandler = require("../helper/errorHandler");
const { successResponse, errorResponse } = require("../helper/response");
const catchAyncError = require("../middleware/catchAyncError");
const User = require("../models/user");
const ApiFeature = require("../helper/apiFeature");

//All Product
exports.getAllProducts = catchAyncError(async (req, res) => {
    
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeature(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const product = await apiFeature.query;
    return successResponse(res, {...product, productCount});
});

//Create Product
exports.register = catchAyncError(async (req, res) => {

    const { name, email, password } = req.body;
    
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            publicId: "someid",
            url: "url"
        }
    });

    return successResponse(res, user, 201);
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