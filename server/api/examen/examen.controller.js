/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/examens              ->  index
 * POST    /api/examens              ->  create
 * GET     /api/examens/:id          ->  show
 * PUT     /api/examens/:id          ->  update
 * DELETE  /api/examens/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Examen = require('./examen.model');

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

// Gets a list of Examens
exports.index = function(req, res) {
  Examen.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Examen from the DB
exports.show = function(req, res) {
  Examen.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Examen in the DB
exports.create = function(req, res) {
  Examen.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Examen in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Examen.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Examen from the DB
exports.destroy = function(req, res) {
  Examen.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

exports.search = function(req, res) {
  Examen.find(req.body)
    .then(responseWithResult(res))
    .then(handleError(res));
}
