const express = require('express');
const router = express.Router();
const productController = require('../controllers/product/product-controller');

const routeHandler = (status, res, path) => {
    const state = status.toString() || '-1';
    const handler = {
        '1': () => path ? res.redirect(path) : false,
        '0': () => res.redirect('/error'),
        '-1': () => console.error('No directions required')
    }
    handler[state]();
}

//CREATE
router.get('/create', async (req, res) => {
    const status = await productController.create.get(req, res);
    routeHandler(status, res);
});
router.post('/create', async (req, res) => {
    const status = await productController.create.post(req, res);
    routeHandler(status, res, '/');
});


//LIST
router.get('/list', async (req, res) => {
    const status = await productController.list.get(req, res);
    routeHandler(status, res);
});


//DETAILS
router.get('/details/:id', async (req, res) => {
    const status = await productController.details.get(req, res);
    routeHandler(status, res);
});
router.post('/details/:id', async (req, res) => {
    const status = await productController.details.post(req, res);
    routeHandler(status, res, `/sharedTrips/details/${req.params.id}`);
});


//REMOVE
router.get('/delete/:id', async (req, res) => {
    const status = await productController.delete.get(req, res);
    routeHandler(status, res, '/');
});

module.exports = router;