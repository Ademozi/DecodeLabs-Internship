const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    // id: Mongoose automatically creates an _id field for each document,
    //  so we don't need to define it explicitly.
    email: {
        type: String,
        required: true, // The field cannot be empty
        unique: true // Never allow two users with the same email.
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now // the function call when a document is created.
    }
});