var DtoProvider = require('../dto/DtoProvider').DtoProvider;

var helloProvider= new DtoProvider('localhost', 27017, 'asok');
helloProvider.setCollectionName('greetings');

exports.random_json = function(req, res) {
  helloProvider.findAll(function(error, items){
    var rand = items[Math.floor(Math.random() * items.length)];
    res.send(rand);
  });
};

exports.list_json = function(req, res){
  helloProvider.findAll(function(error, items){
    res.send(items);
  });
};


exports.list = function(req, res) {
  helloProvider.findAll(function(error, items){
      res.render('hellolist', {
          "hellolist" : items
      });
  });
};

exports.create = function(req, res){
  res.render('newhello', { title: 'Add New hello' });
};

exports.edit = function(req, res){
  helloProvider.findById(req.params.id, function (error, item) {
    res.render('edithello', { title: 'Edit hello', hello: item });
  });
};

exports.update = function (req, res) {
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
exports.add = function (req, res) {
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

exports.del = function (req, res) {
  console.log("params", req.params);
  var delId = req.params.id;
  helloProvider.delete(delId, function( error, docs) {
    res.redirect('/')
  });

};

