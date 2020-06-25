const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
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
