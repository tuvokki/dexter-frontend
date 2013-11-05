var DtoProvider = require('../dto/DtoProvider').DtoProvider;

var helloProvider= new DtoProvider('localhost', 27017, 'asok');
helloProvider.setCollectionName('greetings');

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
      res.redirect('/')
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
    res.redirect('/')
  });

};

var del = function (req, res) {
  console.log("params", req.params);
  var delId = req.params.id;
  helloProvider.delete(delId, function( error, docs) {
    res.redirect('/')
  });

};

module.exports = function (app) {
  app.get('/hello/list', list);
  app.get('/hello/new', create);
  app.get('/hello/edit/:id', edit);
  app.get('/hello/del/:id', del);
  app.get('/hello/list.json', list_json);
  app.get('/hello/random.json', random_json);
  app.post('/hello/add', add);
  app.post('/hello/update', update);
};
