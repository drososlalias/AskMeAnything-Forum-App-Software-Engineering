const mongoose = require("mongoose");

require("custom-env").env("localhost");

const db = process.env.DB;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err.message);
        //Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
