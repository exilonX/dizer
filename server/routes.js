/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

module.exports = function(app) {

  // Insert routes below
  app.use('/api/facturas', require('./api/factura'));
  app.use('/api/examens', require('./api/examen'));
  app.use('/api/cursants', require('./api/cursant'));
  app.use('/api/contracts', require('./api/contract'));
  app.use('/api/curs', require('./api/curs'));
  app.use('/api/grupas', require('./api/grupa'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/things', require('./api/thing'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);


  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
