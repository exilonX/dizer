'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var Curschema = new Schema({
  denumireCurs: {type: String, required: true},
  nrOre: Number,
  pretIntreg:Number,
  pretRate:Number,
  nrRate:Number
});

module.exports = mongoose.model('Curs', CursSchema);
