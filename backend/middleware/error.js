const ErrorHandler = require("../helper/errorHandler");
const { errorResponse } = require("../helper/response");

module.exports = (err, req, res, next) => {
    err.status = err.statusCode || 422;
    err.message = err.message || 'Something went wrong';

    //Duplicate Key Error
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message);
    }

    //Wrong mongodb Id error
    if(err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message);
    }

    //Wrong JWT Error
    if(err.name === "JsonWebTokenError") {
        const message = "Json Web Token is invalid, try again";
        err = new ErrorHandler(message);
    }

    //JWT Expire Error
    if(err.name === "TokenExpiredError") {
        const message = "Json Web Token is Expired, try again"
        err = new ErrorHandler(message);
    }

    errorResponse(res, err, err.status);
}