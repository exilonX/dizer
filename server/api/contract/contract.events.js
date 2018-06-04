/**
 * Contract model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Contract = require('./contract.model');
var ContractEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ContractEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Contract.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ContractEvents.emit(event + ':' + doc._id, doc);
    ContractEvents.emit(event, doc);
  }
}

module.exports = ContractEvents;
