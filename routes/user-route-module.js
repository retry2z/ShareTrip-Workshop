const config = require('../config/config');
const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
    console.log(req.user);
});

router.get('/logout', (req, res) => {
    res.clearCookie(config.authCookie);
    res.redirect('/');
});


module.exports = router;