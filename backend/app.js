const express = require("express");
const products = require("./routes/product");
const user = require("./routes/user");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");

const app = express();
app.use(express.json());
app.use(cookieParser());

//Routes
const mainRouter = express.Router();
mainRouter.use("/product", products);
mainRouter.use("/user", user);

app.use("/v1/api", mainRouter);
app.use(errorMiddleware)


module.exports = app;