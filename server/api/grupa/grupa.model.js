'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var GrupaSchema = new Schema({
  idCurs: {type : Schema.Types.ObjectId, ref : 'Curs'},
  dataStart : Date,
  dataStop :Date,
  nrGrupa : Number
});

module.exports = mongoose.model('Grupa', GrupaSchema);
