/**
 * This module loads dynamically all routes modules located in the routes/
 * directory.
 */
'use strict';
var fs = require('fs');
var path = require('path');

module.exports = function (app) {
  fs.readdirSync('./routes').forEach(function (file) {
    // Avoid to read this current file.
    if (file === path.basename(__filename)) { return; }

    // Load the route file.
    require('./' + file)(app);
  });
};

/**
usage in your app,js
// Load all routes.
  require('./routes')(app);

in your /routes/hello.js
With that module, creating a new route definition and implementation is really easy. For examples, hello.js:

function hello(req, res) {
  res.send('Hello world');
}

module.exports = function (app) {
  app.get('/api/hello_world', hello);
};
Each route module is standalone.
**/