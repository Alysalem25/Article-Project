const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName
        : {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['reader', 'editor', 'admin']
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    state: {
        type: String,
    },
    education: {
        type: String,
    },
    nationalId: {
        type: String,
    },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }] ,// References articles

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
