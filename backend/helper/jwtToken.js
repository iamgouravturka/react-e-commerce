
//Save and send cookie token
const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    //options for cookies
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXIPRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.status(statusCode).cookie("token", token, options).json({
        user,
        token
    });
}

module.exports = sendToken;