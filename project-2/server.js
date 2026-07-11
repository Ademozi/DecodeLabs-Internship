const express = require('express'); 
require('dotenv').config();
const app = express();
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});