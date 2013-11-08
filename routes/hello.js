var DtoProvider = require('../dto/DtoProvider').DtoProvider;

var helloProvider= new DtoProvider('localhost', 27017, 'asok');
helloProvider.setCollectionName('greetings');

var basePath = '/backend';
var moduleName = 'hello';

var random_json = function(req, res) {
  helloProvider.findAll(function(error, items){
    var rand = items[Math.floor(Math.random() * items.length)];
    res.send({hello: rand});
  });
};

var list_json = function(req, res){
  helloProvider.findAll(function(error, items){
    res.send({hellos: items});
  });
};

var list = function(req, res) {
  helloProvider.findAll(function(error, items){
      res.render('hello/list', {
          "basepath": basePath,
          "hellolist" : items
      });
  });
};

var create = function(req, res){
  res.render('hello/create', { title: 'Add New hello' });
};

var edit = function(req, res){
  helloProvider.findById(req.params.id, function (error, item) {
    res.render('hello/edit', { title: 'Edit hello', hello: item });
  });
};

var update = function (req, res) {
  var helloGreeting = req.body.hellogreeting;
  var helloRecipient = req.body.hellorecipient;

  helloProvider.findById(req.param('_id'), function (error, item) {
    helloProvider.update(req.param('_id'), {
      greeting: helloGreeting,
      recipient: helloRecipient
    }, function( error, docs) {
      res.redirect(basePath + '/' + moduleName + '/')
    });
  });
};

var add = function (req, res) {
  // Get our form values. These rely on the "name" attributes
  var helloGreeting = req.body.hellogreeting;
  var helloRecipient = req.body.hellorecipient;
  helloProvider.save({
    greeting: helloGreeting,
    recipient: helloRecipient
  }, function( error, docs) {
    res.redirect(basePath + '/' + moduleName + '/')
  });

};

var del = function (req, res) {
  console.log("params", req.params);
  var delId = req.params.id;
  helloProvider.delete(delId, function( error, docs) {
    res.redirect(basePath + '/' + moduleName + '/')
  });

};

module.exports = function (app) {
  app.namespace(basePath, function(){
    app.get('/' + moduleName + '/list', list);
    app.get('/' + moduleName + '/new', create);
    app.get('/' + moduleName + '/edit/:id', edit);
    app.get('/' + moduleName + '/del/:id', del);
    app.get('/' + moduleName + '/list.json', list_json);
    app.get('/' + moduleName + '/random.json', random_json);
    app.post('/' + moduleName + '/add', add);
    app.post('/' + moduleName + '/update', update);
  });
};
