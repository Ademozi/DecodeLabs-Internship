const express = require("express");
const User = require("../models/User");

const createUser = async (req, res) => {
    const newUser = new User();

    const userEmail = req.body.userEmail;
    const userAge = req.body.userAge;
    const userActivity = req.body.userActivity;
    const userCreatedAt = req.body.userCreatedAt;

    newUser.email = userEmail;
    newUser.age = userAge;
    newUser.is_active = userActivity; 
    newUser.created_at = userCreatedAt;

    await newUser.save();

    res.json({
        message: "the user is saved successfully"
    });
};

const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

const getUsersById = async (req, res) => {
    const id = req.params.id;

    try {
        // mongoose's findById method.
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
};

const deleteUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(id);
        res.json(user);
        return;
    } catch (error) {
        console.log("error while reading user of id ", id);
        return res.json(error);
    }
};

module.exports = {
    createUser,
    getUsers,
    getUsersById,
    deleteUserById
};