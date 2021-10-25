const jwt = require("jsonwebtoken");
const ErrorHandler = require("../helper/errorHandler");
const User = require("../models/user");
const catchAyncError = require("./catchAyncError");

exports.isAuthenticatedUser = catchAyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if(!token) {
        return next(new ErrorHandler("Please login to access the resource", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRETS);

    // data = await User.findById(decodedData.id);

    // console.log(data);

    next();
})