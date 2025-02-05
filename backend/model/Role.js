const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    }

})

module.exports = mongoose.model('role', RoleSchema);