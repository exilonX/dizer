/**
 * Grupa model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Grupa = require('./grupa.model');
var GrupaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GrupaEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Grupa.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    GrupaEvents.emit(event + ':' + doc._id, doc);
    GrupaEvents.emit(event, doc);
  }
}

module.exports = GrupaEvents;
