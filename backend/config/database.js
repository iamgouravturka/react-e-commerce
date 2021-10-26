const mongoose = require("mongoose");

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const connectDatabase = () => {
    mongoose.connect( process.env.DB_URI, mongoOptions ).then((data) => {
        console.log(`Mongoose connected with server ${data.connection.host}`);
    }).catch((err) => console.error(err));
}

module.exports = connectDatabase;