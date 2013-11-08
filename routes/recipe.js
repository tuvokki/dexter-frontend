var DtoProvider = require('../dto/DtoProvider').DtoProvider;

var recipeProvider= new DtoProvider('localhost', 27017, 'asok');
recipeProvider.setCollectionName('recipelist');

var random_json = function(req, res) {
  recipeProvider.findAll(function(error, items){
    var rand = items[Math.floor(Math.random() * items.length)];
    res.send({recipe: rand});
  });
};

var list_json = function(req, res){
  recipeProvider.findAll(function(error, items){
    res.send({recipes: items});
  });
};

var list = function(req, res) {
  recipeProvider.findAll(function(error, items){
      res.render('recipe/list', {
          "recipelist" : items
      });
  });
};

var create = function(req, res){
  res.render('recipe/create', { title: 'Add New recipe' });
};

var edit = function(req, res){
  recipeProvider.findById(req.params.id, function (error, item) {
    res.render('recipe/edit', { title: 'Edit recipe', recipe: item });
  });
};

var update = function (req, res) {
  var recipeGreeting = req.body.recipegreeting;
  var recipeRecipient = req.body.reciperecipient;

  recipeProvider.findById(req.param('_id'), function (error, item) {
    recipeProvider.update(req.param('_id'), {
      greeting: recipeGreeting,
      recipient: recipeRecipient
    }, function( error, docs) {
      res.redirect('/')
    });
  });
};

var add = function (req, res) {
  // Get our form values. These rely on the "name" attributes
  var recipeGreeting = req.body.recipegreeting;
  var recipeRecipient = req.body.reciperecipient;
  recipeProvider.save({
    greeting: recipeGreeting,
    recipient: recipeRecipient
  }, function( error, docs) {
    res.redirect('/')
  });

};

var del = function (req, res) {
  console.log("params", req.params);
  var delId = req.params.id;
  recipeProvider.delete(delId, function( error, docs) {
    res.redirect('/')
  });

};

module.exports = function (app) {
  app.get('/recipe/list', list);
  app.get('/recipe/new', create);
  app.get('/recipe/edit/:id', edit);
  app.get('/recipe/del/:id', del);
  app.get('/recipe/list.json', list_json);
  app.get('/recipe/random.json', random_json);
  app.post('/recipe/add', add);
  app.post('/recipe/update', update);
};
