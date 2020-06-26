const config = require('../config/config');
const user = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserManagement = require('../models/Services/UserManagement');
const Account = require('../models/validation/Account-validation');


const authenticate = async (request, response, next) => {
    const cookie = request.signedCookies[config.authCookie] || false;

    if (!cookie) {
        return next();
    }

    try {
        const verified = await jwt.verify(cookie, config.secretToken);
        const account = await user.findById(verified.uid);

        if (!account) {
            throw new Error('Invalid cookie data');
        }
        request.user = new UserManagement(account);
        return next();
    }
    catch (err) {
        console.error('Permission Denied: ', err.message);
        return response.redirect('/error');
    }
};

const authService = {
    async register(data) {
        const { email, password, rePassword } = data;

        if (password !== rePassword) {
            throw new TypeError('Passwords are not equals');
        }

        try {
            const tmp = await new user(new Account({ email, password })).save();
            return await jwt.sign({ uid: tmp._id }, config.secretToken)
        }
        catch (err) {
            if (err.name === 'TypeError') {
                throw new TypeError(err.message);
            }
            if (err.name === 'URIError') {
                throw new URIError(err.message);
            }
            console.error(err);
            return false
        }
    },

    async login(data) {
        const { email, password } = data;

        try {
            new Account(data);

            const tmp = await user.findOne({ email });
            if (!tmp) {
                throw new TypeError('Invalid input email or password');
            }

            if (await bcrypt.compare(password, tmp.password)) {
                return await jwt.sign({ uid: tmp._id }, config.secretToken, { expiresIn: '1h' })
            } else {
                throw new TypeError('Invalid input email or password');
            }
        }
        catch (err) {
            if (err.name === 'TypeError') {
                throw new TypeError(err.message);
            }
            if (err.name === 'URIError') {
                throw new URIError(err.message);
            }
            console.error(err);
            return false
        }
    },

    async logout() {

    }
};

module.exports = {
    authenticate,
    authService,
}