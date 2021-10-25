const express = require("express");
const products = require("./routes/product");

const app = express();
app.use(express.json());

//Routes
const mainRouter = express.Router();
mainRouter.use("/product", products);

app.use("/v1/api", mainRouter);


module.exports = app;