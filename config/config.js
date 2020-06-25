const dotenv = require('dotenv').config();
const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbURL: process.env.DB_CONNECT || 'mongodb://localhost:27017/',
        secretToken: process.env.SECRET_TOKEN || '',
        authCookie: process.env.AUTH_COOKIE || '',
        secretCookie: process.env.SECRET_COOKIE || '',
    },
    production: {}
};

module.exports = config[env];