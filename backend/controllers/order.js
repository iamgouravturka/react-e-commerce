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
    
    successResponse(res, order);
});

//Get All Orders
exports.getAllOrders = catchAyncError(async (req, res) => {
    const order = await Order.find().populate("user", "name email");

    let totalAmount = 0;
    order.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    successResponse(res, { order, totalAmount });
});

// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHander("You have already delivered this order", 400));
    }
  
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });
  
  async function updateStock(id, quantity) {
    const product = await Product.findById(id);
  
    product.Stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }
  
    await order.remove();
  
    res.status(200).json({
      success: true,
    });
  });