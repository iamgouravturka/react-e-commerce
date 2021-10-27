const express = require("express");
const products = require("./routes/product");
const errorMiddleware = require("./middleware/error")

const app = express();
app.use(express.json());

//Routes
const mainRouter = express.Router();
mainRouter.use("/product", products);

app.use("/v1/api", mainRouter);
app.use(errorMiddleware)


module.exports = app;