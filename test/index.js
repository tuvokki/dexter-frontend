var should    = require('chai').should(),
    supertest = require('supertest'),
    api       = supertest('http://dexter.dev');

    describe('GET /404', function(){
      it('should respond with 404', function(done){
        api.get('/404')
        .expect(404, done)
      })
    })
