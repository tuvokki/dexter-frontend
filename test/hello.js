var should    = require('chai').should(),
    supertest = require('supertest'),
    api       = supertest('http://dexter.dev');

describe('In the hello-world-list application', function() {

  describe('the index', function () {

    it('should correctly get a list of hellos', function(done){
      api.get('/')
        .expect(200) //Status code
        .end(function(err,res) {
          if (err) {
            throw err;
          }
          res.text.should.include('<h1>Hello List</h1>');
          res.text.should.include('Hello world');
          res.text.should.include('Ola mundo');
          res.text.should.include('Hallo wereld');
          done();
      });
    });

  });

  describe('the random function /hello/list.json', function () {
    
    it('should return all hellos as JSON', function(done) {
      api.get('/hello/list.json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('hellos').and.be.instanceof(Array);
        done();
      });
    });

  });

  describe('the random function /hello/list.json', function () {

    it('should return one hello as JSON', function(done) {
      api.get('/hello/random.json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('hello').and.be.instanceof(Object).to.have.property('greeting');
        done();
      });
    });
 
  });

});