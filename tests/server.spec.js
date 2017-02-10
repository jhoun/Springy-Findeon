const request = require('supertest');
const chai = require('chai');
const app = require('../server');
const expect = chai.expect;
chai.should();

describe('GET /api/pokedex', function() {
  it('respond with redirecting to /api/pokedex', function(done) {
    request(app)
      .get('/api/pokedex')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
});

describe('GET /api/pokedex/:id', function() {
  it('respond with redirecting to /api/pokedex', function(done) {
    request(app)
      .get('/api/pokedex/002')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }
        console.log(res);
        expect(res.body[0]).to.equal('ivysaur')
        done()
      });
  })
});