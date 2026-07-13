const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { createUser, getUsers, getUsersById } = require('../controllers/usersController')

router.post("/users", createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUsersById);

module.exports = router;