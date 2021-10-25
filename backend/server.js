const app = require("./app");
const dotenv = require("dotenv");

// Config
dotenv.config({path: ".env"});

app.listen(process.env.PORT, () => {
    console.log(`server is listening on http://localhost:${process.env.PORT}`);
})