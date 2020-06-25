const config = require('./config');
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const { authenticate } = require('../controllers/auth-service');
const routes = require('../routes/index');

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(cookieParser(config.secretCookie));
    app.use(authenticate);
    app.engine('.hbs', handlebars({
        extname: '.hbs',
        layoutsDir: path.join(__dirname, '../views/layouts')
    }));
    app.set('view engine', '.hbs');

    routes(app);
};

