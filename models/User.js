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
    cubes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'cubes',
    }],
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hash(this.password, salt);

        this.password = hashedPassword;
        next();
    }
});

module.exports = mongoose.model('users', userSchema);
