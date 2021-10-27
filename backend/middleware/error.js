const { errorResponse } = require("../helper/response");

module.exports = (err, req, res, next) => {
    err.status = err.statusCode || 422;
    err.message = err.message || 'Something went wrong';

    errorResponse(res, err, err.status);
}