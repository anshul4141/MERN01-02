const mongoose = require('mongoose');

const UserScehma = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    loginId: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    dob: {
        type: Date,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        require: true,
    }

})

module.exports = mongoose.model('user', UserScehma);