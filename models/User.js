const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    cubes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'cubes',
    }],
});

module.exports = mongoose.model('users', userSchema);
