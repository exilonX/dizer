'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ContractSchema = new Schema({
  idCursant: { type : Schema.Types.ObjectId, ref : 'Curs' },
  idGrupa: {type: Schema.Types.ObjectId, ref: 'Grupa'},
  nrContract : Number,
  dataContract : Date,
  discount : Number
});

module.exports = mongoose.model('Contract', ContractSchema);
