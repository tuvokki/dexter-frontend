var DtoProvider = require('../dto/DtoProvider').DtoProvider;

var recipeProvider= new DtoProvider('localhost', 27017, 'asok');
recipeProvider.setCollectionName('recipelist');

var tasteProvider= new DtoProvider('localhost', 27017, 'asok');
tasteProvider.setCollectionName('tastes');

var tasteoptions = [];

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
  tasteProvider.findAll(function(error, tasteitems){
    res.render('recipe/create', { title: 'Add New recipe', tasteoptions: tasteitems });
  });
};

var edit = function(req, res){
  recipeProvider.findById(req.params.id, function (error, item) {
    tasteProvider.findAll(function(error, tasteitems){
      res.render('recipe/edit', { title: 'Edit recipe', recipe: item.recipe, id: item._id.toHexString(), tasteoptions: tasteitems });
    });
  });
};

var update = function (req, res) {
  recipeProvider.findById(req.param('_id'), function (error, item) {
    recipeProvider.update(req.param('_id'), { recipe: req.body.recipe, created_at: item.created_at, modified_at: new Date() }, function( error, docs) {
      res.redirect('/recipe/list')
    });
  });
};

var add = function (req, res) {
  // Get our form values. These rely on the "name" attributes
  recipeProvider.save(req.body, function( error, docs) {
    res.redirect('/recipe/list')
  });

};

var del = function (req, res) {
  var delId = req.params.id;
  recipeProvider.delete(delId, function( error, docs) {
    res.redirect('/recipe/list')
  });

};

/* Tastes */

var taste_list_json = function(req, res){
  tasteProvider.findAll(function(error, items){
    res.send({tastes: items});
  });
};

var taste_list = function(req, res) {
  tasteProvider.findAll(function(error, items){
      res.render('taste/list', {
          "tastelist" : items
      });
  });
};

var taste_create = function(req, res){
  res.render('taste/create', { title: 'Add New taste' });
};

var taste_add = function (req, res) {
  // Get our form values. These rely on the "name" attributes
  var tasteValue = req.body.tastevalue;
  var tasteLabel = req.body.tastelabel;
  tasteProvider.save({
    value: tasteValue,
    label: tasteLabel
  }, function( error, docs) {
    res.redirect('/taste/list')
  });

};

var taste_del = function (req, res) {
  var delId = req.params.id;
  tasteProvider.delete(delId, function( error, docs) {
    res.redirect('/taste/list')
  });

};

module.exports = function (app) {
  //gets
  app.get('/recipe/list', list);
  app.get('/recipe/new', create);
  app.get('/recipe/edit/:id', edit);
  app.get('/recipe/del/:id', del);
  app.get('/recipe/list.json', list_json);
  app.get('/recipe/random.json', random_json);
  app.get('/taste/list', taste_list);
  app.get('/taste/new', taste_create);
  app.get('/taste/del/:id', taste_del);
  app.get('/taste/list.json', taste_list_json);
  //posts
  app.post('/recipe/add', add);
  app.post('/recipe/update', update);
  app.post('/taste/add', taste_add);
};
