'use strict';

var express = require('express');
var controller = require('./contract.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/regex/:nrContract', controller.searchRegex);
router.get('/count/:idGrupa', controller.nrContracte);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/search', controller.search);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
