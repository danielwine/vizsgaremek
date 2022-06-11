const express = require("express");
const genreService = require('../genre/service');
const controller = require('../base/controller')(genreService);

const router = express.Router();

router.post('/', (req, res, next) => {
    return controller.create(req, res, next);
});

router.get('/', (req, res, next) => {
    return controller.findAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
    return controller.findOne(req, res, next);
});

router.put('/:id', (req, res, next) => {
    return controller.updateOne(req, res, next);
});

router.delete('/:id', (req, res, next) => {
    return controller.deleteOne(req, res, next);
});

module.exports = router;