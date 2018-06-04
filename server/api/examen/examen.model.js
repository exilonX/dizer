'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ExamenSchema = new Schema({
  idCursant: {type : Schema.Types.ObjectId, ref : 'Cursant'},
  notaTeoretic : Number,
  notaPractic : Number,
  serieDiploma : String
});

module.exports = mongoose.model('Examen', ExamenSchema);
