const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    blog: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('Blog', blogSchema);