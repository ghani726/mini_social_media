require("dotenv").config()

const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB);
    console.log('Connected to MongoDB');
}

module.exports = connectDB;