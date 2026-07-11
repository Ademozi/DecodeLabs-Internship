const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        // we immediately stop the application.
        process.exit(1);
    }
};

module.exports = connectDB; 