const express = require('express');
const router = express.Router();
const cubeController = require('../controllers/product/product-controller');

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
    const status = await cubeController.create.get(req, res);
    routeHandler(status, res);
});
router.post('/create', async (req, res) => {
    const status = await cubeController.create.post(req, res);
    routeHandler(status, res, '/');
});


//LIST
router.get('/list', async (req, res) => {
    const status = await cubeController.list.get(req, res);
    routeHandler(status, res);
});


//DETAILS
router.get('/details/:id', async (req, res) => {
    const status = await cubeController.details.get(req, res);
    routeHandler(status, res);
});
router.post('/details/:id', async (req, res) => {
    const status = await cubeController.details.post(req, res);
    routeHandler(status, res, `/cubic/details/${req.params.id}`);
});


//REMOVE
router.get('/delete/:id', async (req, res) => {
    const status = await cubeController.delete.get(req, res);
    routeHandler(status, res);
});
router.post('/delete/:id', async (req, res) => {
    const status = await cubeController.delete.post(req, res);
    routeHandler(status, res, '/');
});

//EDIT
router.get('/edit/:id', async (req, res) => {
    const status = await cubeController.edit.get(req, res);
    routeHandler(status, res);
});
router.post('/edit/:id', async (req, res) => {
    const status = await cubeController.edit.post(req, res);
    routeHandler(status, res, `/cubic/details/${req.params.id}`);
});

module.exports = router;