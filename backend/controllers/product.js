const ErrorHandler = require("../helper/errorHandler");
const { successResponse, errorResponse } = require("../helper/response");
const catchAyncError = require("../middleware/catchAyncError");
const Product = require("../models/product");
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
exports.createProduct = catchAyncError(async (req, res) => {
    req.body.user = req.user.id;
    
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

//Create Review or update review
exports.productReview = catchAyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    )
    
    if(isReviewed) {
        product.reviews.forEach((rev) => {
            if(rev.user.toString() === req.user._id.toString()) 
            {
                (rev.rating = rating), (rev.comment = comment);
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating;
    })

    product.ratings = avg;

    await product.save({ validateBeforeSave: false });

    successResponse(res, product);
});

//get all review of a product
exports.getProductReview = catchAyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if(!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    successResponse(res, {reviews: product.reviews});
});

//Delete Review
exports.deleteReview = catchAyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if(!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter((rev) => 
        rev._id.toString() != req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += avg / reviews.length;
    });

    const ratings = avg / reviews.length;

    const numOfReviews = reviews.length;

    await product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    );
 
    successResponse(res);
});