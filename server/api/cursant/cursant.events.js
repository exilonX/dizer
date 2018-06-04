/**
 * Cursant model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Cursant = require('./cursant.model');
var CursantEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CursantEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Cursant.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CursantEvents.emit(event + ':' + doc._id, doc);
    CursantEvents.emit(event, doc);
  }
}

module.exports = CursantEvents;
