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

//TODO: fetch from database
var tasteoptions = [
  { value: 'Hot', label: 'Hot' },
  { value: 'Spicy', label: 'Spicy' },
  { value: 'Normal', label: 'Normal' },
  { value: 'Cool', label: 'Cool' },
  { value: 'Fresh', label: 'Fresh' }
]

var create = function(req, res){
  res.render('recipe/create', { title: 'Add New recipe', tasteoptions: tasteoptions });
};

var edit = function(req, res){
  recipeProvider.findById(req.params.id, function (error, item) {
    res.render('recipe/edit', { title: 'Edit recipe', recipe: item.recipe, id: item._id.toHexString(), tasteoptions: tasteoptions });
  });
};

var update = function (req, res) {
  console.log("req.body", req.body);
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
