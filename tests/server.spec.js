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
        expect(res.body).to.equal(800)
        done()
      });
  })
});

describe('GET /api/pokedex/:id', function() {
  it('respond with id matching pokemon id', function(done) {
    request(app)
      .get('/api/pokedex/1')
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
        expect(res.body).to.deep.equal(['psyduck', 'sylveon',])
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
        expect(res.body).to.deep.equal(['staryu', 'starmie', 'starly', 'staraptor', 'staravia' ])
        done()
      });
  })
});

describe('GET total number of pokemon type', function() {
  it('should return total hits of a pokemon type', function(done) {
    request(app)
      .get('/api/pokedex/typeOr/fire')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }
        expect(res.body).to.equal(64)
        done()
      });
  })
  it('should return total hits from two pokemon types', function(done) {
    request(app)
      .get('/api/pokedex/typeOr/fire&ice')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }
        expect(res.body).to.equal(105)
        done()
      });
  })
});

describe('GET total number of pokemon with only types specific types', function() {
  it('should return total hits of pokemon that matches 2 types', function(done) {
    request(app)
      .get('/api/pokedex/typeAnd/water/grass')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }
        expect(res.body).to.equal(3)
        done()
      });
  })
  it('should return total hits of pokemon that matches 3 types', function(done) {
    request(app)
      .get('/api/pokedex/typeAnd/water/grass/flying')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }
        expect(res.body).to.equal(0)
        done()
      });
  })
});

describe('GET array of pokemon where stats matches value', function() {
  it('should return pokemon where stats and value match', function(done) {
    request(app)
      .get('/api/pokedex/byStats/HP/160')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }
        expect(res.body).to.deep.equal(['snorlax'])
        done()
      });
  })
});

describe('GET array of pokemon where stats is above value', function() {
  it('should return pokemon where the value of a state is above a specific number', function(done) {
    request(app)
      .get('/api/pokedex/greaterThan/attack/180')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }
        expect(res.body).to.deep.equal(['mewtwomegamewtwox', 'heracrossmegaheracross', 'groudonprimalgroudon', 'deoxysattackforme', 'rayquazamegarayquaza'])
        done()
      });
  })
});

describe('GET array of pokemon where stats is above value', function() {
  it('should return pokemon where the value of a state is above a specific number', function(done) {
    request(app)
      .get('/api/pokedex/greaterThan/attack/180')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }
        expect(res.body).to.deep.equal(['mewtwomegamewtwox', 'heracrossmegaheracross', 'groudonprimalgroudon', 'deoxysattackforme', 'rayquazamegarayquaza'])
        done()
      });
  })
});

describe('GET array of pokemon where stats is below value', function() {
  it('should return pokemon where the value of a state is below a specific number', function(done) {
    request(app)
      .get('/api/pokedex/lessThan/defense/10')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
        }
        expect(res.body).to.deep.equal(['chansey', 'happiny'])
        done()
      });
  })
});