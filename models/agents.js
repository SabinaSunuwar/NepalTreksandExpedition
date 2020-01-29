const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6
    },
    company: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    conpassword: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Agent', agentSchema);