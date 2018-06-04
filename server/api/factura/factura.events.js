/**
 * Factura model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Factura = require('./factura.model');
var FacturaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FacturaEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Factura.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    FacturaEvents.emit(event + ':' + doc._id, doc);
    FacturaEvents.emit(event, doc);
  }
}

module.exports = FacturaEvents;
