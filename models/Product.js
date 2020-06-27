const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    start: {
        type: String,
        required: true,
        minlength:4,
        maxlength: 250,
    },
    end: {
        type: String,
        required: true,
        minlength:4,
        maxlength: 250,
    },
    date: {
        type: String,
        required: true,
        minlength:4,
        maxlength: 250,
    },
    time: {
        type: String,
        required: true,
        minlength:4,
        maxlength: 250,
    },
    carImage: {
        type: String,
        required: true,
        match: [/^(http|https):/, 'Invalid url address'],
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 250,
    },
    seats: {
        type: Number,
        required: true,
        min: 2,
    },
    buddies: [{
        type: mongoose.Schema.ObjectId,
        ref: 'users',
    }],
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true,
    },
});

module.exports = mongoose.model('tripps', productSchema);
