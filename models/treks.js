const mongoose = require('mongoose');

const trekSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 6
    },
    days: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    itinerary: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('Trek', trekSchema);