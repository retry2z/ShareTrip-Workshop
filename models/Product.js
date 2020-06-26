const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250,
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^(http|https):/, 'Invalid url address'],
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 250,
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
    accessories: [{
        type: mongoose.Schema.ObjectId,
        ref: 'accessories',
    }],
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
});

module.exports = mongoose.model('cubes', cubeSchema);
