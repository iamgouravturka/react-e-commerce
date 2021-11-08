const ErrorHandler = require("../helper/errorHandler");
const { successResponse, errorResponse } = require("../helper/response");
const catchAyncError = require("../middleware/catchAyncError");
const Product = require("../models/product");
const ApiFeature = require("../helper/apiFeature");
const Order = require("../models/order");

//Create New Order
exports.newOrder = catchAyncError(async (req, res) => {
    const order = await Order.create({ ...req.body, paidAt: Date.now(), user: req.user._id });

    successResponse(res, order, 201);
});

//Get Order
exports.getOrderDetail = catchAyncError(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order) {
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    successResponse(res, order);
});

//Get My Order
exports.myOrder = catchAyncError(async (req, res) => {
    const order = await Order.find({ user: req.user._id }).populate("user", "name email");

    if(!order) {
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    successResponse(res, order);
});