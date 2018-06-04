'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var CursantSchema = new Schema({
  nume : String,
  prenume : String,
  cnp : String,
  serieCI: String,
  dataCI : String,
  eliberatCI : String,
  nrCI : String
});

module.exports = mongoose.model('Cursant', CursantSchema);
