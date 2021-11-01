const ErrorHandler = require("../helper/errorHandler");
const { successResponse, errorResponse } = require("../helper/response");
const catchAyncError = require("../middleware/catchAyncError");
const User = require("../models/user");
const sendToken = require("../helper/jwtToken");

//register
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

    sendToken(user, 201, res);
});

//login
exports.login = catchAyncError(async (req, res, next) => {

    const { email, password } = req.body;
    
    if(!email || !password) {
        return next(new ErrorHandler("Invalid Email Or Password", 401));
    }

    const user = await User.findOne({ email }).select("+password");

    if(!user) {
        return next(new ErrorHandler("Invalid Email Or Password", 401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email Or Password", 401));
    }    

    const token = user.getJwtToken();

    sendToken(user, 200, res);
});

//logout
exports.logout = catchAyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    successResponse(res);
});