
/**
 * Module dependencies.
 */

var express = require('express');
var hello = require('./routes/hello');
var http = require('http');
var path = require('path');
var ipban = require('./ipban.js');

var app = express();

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
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('aaaf419dfffac16ec1c5abc496d8c37511950687'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', hello.list);
app.get('/hello/list.json', hello.list_json);
app.get('/hello/randomjson', hello.random_json);
app.get('/hello/list', hello.list);
app.get('/hello/new', hello.create);
app.get('/hello/del/:id', hello.del);
app.get('/hello/edit/:id', hello.edit);
app.post('/hello/add', hello.add);
app.post('/hello/update', hello.update);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
