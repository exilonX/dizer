/**
 * Examen model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Examen = require('./examen.model');
var ExamenEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ExamenEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Examen.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ExamenEvents.emit(event + ':' + doc._id, doc);
    ExamenEvents.emit(event, doc);
  }
}

module.exports = ExamenEvents;
