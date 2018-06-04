/**
 * Curs model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Curs = require('./curs.model');
var CursEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CursEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Curs.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CursEvents.emit(event + ':' + doc._id, doc);
    CursEvents.emit(event, doc);
  }
}

module.exports = CursEvents;
