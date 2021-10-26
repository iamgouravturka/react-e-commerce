
const successResponse = (res, data, responseCode) => {
    res.status(responseCode || 200).json(data || {});
}

const errorResponse = (res, err, responseCode) => {
    res.status(responseCode || 422).json({ message: err.message || 'Something went wrong' });
}

module.exports = { successResponse, errorResponse };