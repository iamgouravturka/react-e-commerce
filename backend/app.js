const express = require("express");
const products = require("./routes/product");

const app = express();
app.use(express.json());

//Routes
const mainRouter = express.Router();
mainRouter.use("/products", products);

app.use("/api/v1", mainRouter);


module.exports = app;