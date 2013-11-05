var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

DtoProvider = function(host, port, dbname) {
  this.db= new Db(dbname, new Server(host, port, {}), {safe: true});
  this.db.open(function(){});
};

DtoProvider.prototype.setCollectionName= function (collectionName) {
  this.collectionName = collectionName;
}

DtoProvider.prototype.getCollectionName= function () {
  // use the set collection name or, if unset, the default test database
  return this.collectionName || 'test';
}

DtoProvider.prototype.getCollection= function(callback) {
  this.db.collection(this.getCollectionName(), function(error, dto_collection) {
    if( error ) callback(error);
    else callback(null, dto_collection);
  });
};

//find all greetings
DtoProvider.prototype.findAll = function(callback) {
  this.getCollection(function(error, dto_collection) {
    if( error ) callback(error)
      else {
        dto_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
            else callback(null, results)
          });
      }
    });
};

//find an dto by ID
DtoProvider.prototype.findById = function(id, callback) {
  this.getCollection(function(error, dto_collection) {
    if( error ) callback(error)
      else {
        dto_collection.findOne({_id: dto_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
            else callback(null, result)
          });
      }
    });
};


//save new dto
DtoProvider.prototype.save = function(dtos, callback) {
  this.getCollection(function(error, dto_collection) {
    if( error ) callback(error)
      else {
        if( typeof(dtos.length)=="undefined")
          dtos = [dtos];

        for( var i =0;i< dtos.length;i++ ) {
          dto = dtos[i];
          dto.created_at = new Date();
        }

        dto_collection.insert(dtos, function() {
          callback(null, dtos);
        });
      }
    });
};

//find an dto by ID
DtoProvider.prototype.findById = function(id, callback) {
  this.getCollection(function(error, dto_collection) {
    if( error ) callback(error)
      else {
        dto_collection.findOne({_id: dto_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
            else callback(null, result)
          });
      }
    });
};

// update an dto
DtoProvider.prototype.update = function(dtoId, dtos, callback) {
  this.getCollection(function(error, dto_collection) {
    if( error ) callback(error);
    else {
      dto_collection.update(
        {_id: dto_collection.db.bson_serializer.ObjectID.createFromHexString(dtoId)},
        dtos,
        function(error, dtos) {
          if(error) callback(error);
          else callback(null, dtos)       
        });
    }
  });
};

//delete dto
DtoProvider.prototype.delete = function(dtoId, callback) {
  this.getCollection(function(error, dto_collection) {
    if(error) callback(error);
    else {
      dto_collection.remove(
        {_id: dto_collection.db.bson_serializer.ObjectID.createFromHexString(dtoId)},
        function(error, dto){
          if(error) callback(error);
          else callback(null, dto)
        });
    }
  });
};

exports.DtoProvider = DtoProvider;