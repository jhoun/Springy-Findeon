const request = require('supertest');
const chai = require('chai');
const app = require('../server');
const expect = chai.expect;
chai.should();

describe('GET /api/pokedex', function() {
  it('respond with redirecting to /api/pokedex', function(done) {
    request(app)
      .get('/api/pokedex')
      .type('form')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }
        done()
      });
  })

});