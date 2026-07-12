const express = require('express'); 
require('dotenv').config();
const app = express();
const connectDB = require('./config/db');
const User = require('./models/User');

// Connect to MongoDB
connectDB();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.post("/users", (req, res) => {
    const newUser = new User();

    const userEmail = req.body.userEmail;
    const userAge = req.body.userAge;
    const userActivity = req.body
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
        return;
    } catch (error) {
        console.log("error while reading user of id ", id);
        return res.json(error);
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});