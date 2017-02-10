const request = require('supertest');
const chai = require('chai');
const app = require('../server');
const expect = chai.expect;
chai.should();

describe('GET /api/pokedex', function() {
  it('respond with getting all the pokemon', function(done) {
    request(app)
      .get('/api/pokedex')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }
        expect(res.body).to.equal(722)
        done()
      });
  })
});

describe('GET /api/pokedex/:id', function() {
  it('respond with id matching pokemon id', function(done) {
    request(app)
      .get('/api/pokedex/002')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }
        expect(res.body[0]).to.equal('ivysaur')
        done()
      });
  })
});

describe('GET array of documents where name property matches query', function() {
  it('respond with id matching pokemon id', function(done) {
    request(app)
      .get('/api/pokedex/name/sy')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }
        expect(res.body).to.deep.equal(['sylveon', 'psyduck'])
        done()
      });
  })
});

describe('GET array of documents where field containes specified prefix', function() {
  it('respond with prefix of matching name in pokedex', function(done) {
    request(app)
      .get('/api/pokedex/nameStarts/star')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }
        expect(res.body).to.deep.equal(['staryu', 'staravia', 'starly', 'staraptor', 'starmie'])
        done()
      });
  })
});