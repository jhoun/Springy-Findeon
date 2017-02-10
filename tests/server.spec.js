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
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }
        expect(res.header.status).to.equal(200);
        done()
      });
  })

});