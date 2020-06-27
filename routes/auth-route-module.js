const config = require('../config/config');
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/auth-controller');

const routeHandler = (status, res, path) => {
    if (typeof status !== 'string') {
        const state = status.toString() || '-1';
        const handler = {
            '1': () => path ? res.redirect(path) : false,
            '0': () => res.redirect('/error'),
            '-1': () => console.error('No directions required')
        }
       return handler[state]();
    }

    res.cookie(config.authCookie, status, {
        httpOnly: true,
        signed: true,
        maxAge: 3600000,
    });
    res.redirect('/');

}

router.get('/login', async (req, res) => {
    const status = await authController.login.get(req, res);

    if (!status) {
        console.error('Something went wrong');
        res.redirect('/error');
    }
});

router.post('/login', async (req, res) => {
    const token = await authController.login.post(req, res);
    routeHandler(token, res, '/error');
});

router.get('/register', async (req, res) => {
    const status = await authController.register.get(req, res);

    if (!status) {
        console.error('Something went wrong');
        res.redirect('/error');
    }
});

router.post('/register', async (req, res) => {
    const token = await authController.register.post(req, res);
    routeHandler(token, res, '/error');
});


module.exports = router;