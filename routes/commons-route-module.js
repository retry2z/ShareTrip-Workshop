const express = require('express');
const router = express.Router();
const commonController = require('../controllers/common/common-controller');


router.get('/', async (req, res) => {
    const status = await commonController.home.get(req, res);

    if (!status) {
        res.redirect('/error');
    }
});

router.post('/', async (req, res) => {
    const status = await commonController.home.post(req, res);

    if (!status) {
        res.redirect('/error');
    }
});

router.get('*', async (req, res) => {
    await commonController.notFound.get(req, res);
});


module.exports = router;