const ErrorHandler = require("../helper/errorHandler");
const { successResponse, errorResponse } = require("../helper/response");
const catchAyncError = require("../middleware/catchAyncError");
const User = require("../models/user");
const sendToken = require("../helper/jwtToken");
const { use } = require("../routes/product");
const sendMail = require("../helper/sendEmail");
const crypto = require("crypto");

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

//Forgot Password
exports.forgotPassword = catchAyncError(async (req, res, next) => {

    const { email } = req.body;
    
    if(!email) {
        return next(new ErrorHandler("Invalid Email Or Password", 401));
    }

    const user = await User.findOne({ email }).select("+password");

    if(!user) {
        return next(new ErrorHandler("Invalid Email Or Password", 401));
    }

    //Get reset token
    const resetToken = user.getResetPasswordTokne();

    await user.save({ validateBeforeSave: true });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/v1/api/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n${resetPasswordUrl}\n\nIf you not requested this email please ignore this`;

    try {

        await sendMail({
            email: user.email,
            subject: 'Ecommerce Password Recovery',
            message
        })

        successResponse(res, {message: `Email sent to ${user.email}`});
    } catch(err) {

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        return next(new ErrorHandler(err.message, 400));
    }

});

//Reset Password
exports.resetPassword = catchAyncError(async (req, res, next) => {

    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if(!user) {
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400));
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

});