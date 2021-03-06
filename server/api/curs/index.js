'use strict';

var express = require('express');
var controller = require('./curs.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/regex/:denumireCurs', controller.searchRegex)
router.get('/:id', controller.show);
router.post('/search', controller.search);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
