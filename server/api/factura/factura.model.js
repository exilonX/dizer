'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var FacturaSchema = new Schema({
  idContract : {type : Schema.Types.ObjectId, ref : 'Contract'},
  dataFactura: Date,
  tipPlata : String,
  nrPlata : Number,
  dataPlata : Date
});

module.exports = mongoose.model('Factura', FacturaSchema);
