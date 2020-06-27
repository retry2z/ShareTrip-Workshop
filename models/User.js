const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    author: [{
        type: mongoose.Schema.ObjectId,
        ref: 'tripps',
    }],
    tripHistory: [{
        type: mongoose.Schema.ObjectId,
        ref: 'tripps',
    }],

});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

module.exports = mongoose.model('users', userSchema);
