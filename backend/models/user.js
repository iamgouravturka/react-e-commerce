const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name Cannot Exceed 8 Characters"],
        minLength: [4, "Name should have more than 4 characters"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        validate: [validator.isEmail, "Invalid Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Name"],
        minLength: [8, "Password should greater than 4 characters"]
    },
    avatar: {
        publicId: {
            type: String,
            require: true
        },
        url: {
            type: String,
            require: true
        },
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

module.exports = mongoose.model("User", userSchema);