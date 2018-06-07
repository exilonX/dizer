/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/grupas              ->  index
 * POST    /api/grupas              ->  create
 * GET     /api/grupas/:id          ->  show
 * PUT     /api/grupas/:id          ->  update
 * DELETE  /api/grupas/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Grupa = require('./grupa.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Returneaza o lista de grupe
exports.index = function(req, res) {
  Grupa.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Returneaza o singura grupa
exports.show = function(req, res) {
  Grupa.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creaza o grupa
exports.create = function(req, res) {
  Grupa.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Actualizeaza o grupa existenta
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Grupa.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Sterge o grupa din baza de date
exports.destroy = function(req, res) {
  Grupa.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

exports.search = function(req, res) {
  Grupa.find(req.body)
    .then(responseWithResult(res))
    .then(handleError(res));
}
