const User = require("../models/User");

const createUser = async (req, res) => {

    try {
        const newUser = new User();

        // const userEmail = req.body.userEmail;
        // const userAge = req.body.userAge;
        // const userActivity = req.body.userActivity;
        // const userCreatedAt = req.body.userCreatedAt;
        // Same as above but using object destructuring to extract the values from req.body
        const { userEmail, userAge, userActivity, userCreatedAt } = req.body;

        if (!userEmail || userAge === undefined) {
            return res.status(400).json({
                message: "Email and Age are required. "
            });
        }

        newUser.email = userEmail;
        newUser.age = userAge;
        newUser.is_active = userActivity; 
        newUser.created_at = userCreatedAt;

        await newUser.save();

        return res.status(201).json({
            message: "the user is saved successfully.",
            user: newUser
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already exists."
            });
        }

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const getUsersById = async (req, res) => {
    const id = req.params.id;

    try {
        // mongoose's findById method.
        const user = await User.findById(id);
        if (!user) {
        return res.status(404).json({ 
            message: 'User not found'
        });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const deleteUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(204).send();
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUsersById,
    deleteUserById
};