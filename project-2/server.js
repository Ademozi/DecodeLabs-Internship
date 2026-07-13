const express = require('express'); 
require('dotenv').config();
const app = express();
const connectDB = require('./config/db');
const User = require('./models/User');
const userRoutes = require('./routes/users');
 
// Connect to MongoDB
connectDB();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});