const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Descripton"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
        maxLength: [8, "Price Cannot Exceed 8 Characters"]
    },
    rating: {
        type: Number
    },
    images: [
        {
            publicId: {
                type: String,
                require: true
            },
            url: {
                type: String,
                require: true
            },
        }
    ],
    category: {
        type: String,
        require: [true, "Please Enter Product Category"]
    },
    stock: {
        type: Number,
        require: [true, "Please Enter Product Stock"],
        maxLength: [4, "Stock Cannot Exceed 4 Characters"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                require: true
            },
            rating: {
                type: Number,
                require: true
            },
            comment: {
                type: String,
                require: true
            },
        }
    ],
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Product", productSchema);