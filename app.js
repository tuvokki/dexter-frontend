
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var ipban = require('./ipban.js');
var namespace = require('express-namespace');
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

/**
Adding passport integration

http://www.scotchmedia.com/tutorials/express/authentication/1/01
http://bytesofpi.com/post/21137013778/simple-twitter-user-authentication-with-node-js
**/

//supertest takes the express app that it will be testing as an argument, therefore we must export our app
var app = exports.app = express();

// all environments
app.set('port', process.env.PORT || 3476);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
if ('development' == app.get('env')) {
  // in development only allow 127.0.0.1
  app.use(ipban('on'));
}
app.use(express.favicon());
app.use(express.logger('dev'));
// deprecation warning for multipart
//If you want to avoid any warning messages, do this instead (which is what connect.bodyParser() will be in 3.0):
// app.use(express.bodyParser());
app.use(express.urlencoded())
app.use(express.json())
// end deprecation warning for multipart
app.use(express.methodOverride());
app.use(express.cookieParser('aaaf419dfffac16ec1c5abc496d8c37511950687'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  //pretty print html output with tabs and newlines in development
  app.locals.pretty = true;
}

// Load all routes.
require('./routes')(app);

// some uglyness, the first rooute in the exports of hello is the list action
//this changes when a routefile is added with an first letter in [a..g] :)
app.get('/', app.routes.get[0].callbacks[0]);
// Add Passport support
app.post('/auth/local', auth.local);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
