/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/cursants              ->  index
 * POST    /api/cursants              ->  create
 * GET     /api/cursants/:id          ->  show
 * PUT     /api/cursants/:id          ->  update
 * DELETE  /api/cursants/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Cursant = require('./cursant.model');

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

// Gets a list of Cursants
exports.index = function(req, res) {
  Cursant.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Cursant from the DB
exports.show = function(req, res) {
  Cursant.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Cursant in the DB
exports.create = function(req, res) {
  Cursant.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Cursant in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Cursant.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Cursant from the DB
exports.destroy = function(req, res) {
  Cursant.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

exports.searchRegex = function(req, res) {
  var search = {};
  if (req.params.nume.indexOf(" ") != -1) {
    search.nume = new RegExp("^" + req.params.nume.split(" ")[0]);
    search.prenume = new RegExp("^" + req.params.nume.split(" ")[1]);
  } else {
    search.nume = new RegExp("^" + req.params.nume);
  }
  console.log(search)
  Cursant.find(search)
    .then(responseWithResult(res))
    .then(handleError(res));
};


exports.search = function(req, res) {
  Cursant.find(req.body)
    .then(responseWithResult(res))
    .then(handleError(res));
}
