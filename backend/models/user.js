const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

//Encrypt password
userSchema.pre("save", async function(next) {

    if(!this.isModified("password")) {
        next();
    }

    this.password = bcrypt.hash(this.password, 10);
})

//JWT token
userSchema.methods.getJwtToken = function() {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRETS, { expiresIn: process.env.JWT_EXP })
}

//JWT token
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User", userSchema);