const ErrorHandler = require("../helper/errorHandler");
const { errorResponse } = require("../helper/response");

module.exports = (err, req, res, next) => {
    err.status = err.statusCode || 422;
    err.message = err.message || 'Something went wrong';

    //Wrong mongodb Id error
    if(err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message);
    }

    errorResponse(res, err, err.status);
}