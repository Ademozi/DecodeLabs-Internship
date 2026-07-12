const express = require('express'); 
require('dotenv').config();
const app = express();
const connectDB = require('./config/db');
const User = require('./models/User');

// Connect to MongoDB
connectDB();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});