const express = require('express');
const router = express.Router();
const elasticsearch = require('elasticsearch');

const elasticClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

router.route('/')
  .get((req,res) => {
    elasticClient.search({
      index:"pokedex",
      type: "pokemon"
    })
      .then((body) => {
        // var allPokemon = body.hits.hits.map((pokemon) => {
        //   return pokemon._source;
        // })
        res.json(body.hits.total);
    })
      .catch((e) => {
        console.error(e);
        res.json(card);
    });
  })

router.route('/:id')
  .get((req,res) => {
    console.log('req.params.id: ', req.params.id);
    elasticClient.search({
      index:"pokedex",
      body: {
        query: {
          match: {
            _id: req.params.id
          }
        }
      }
    })
      .then((body) => {
        var allPokemon = body.hits.hits.map((pokemon) => {
          return pokemon._source.name;
        })
        res.json(allPokemon);
    })
      .catch((e) => {
        console.error(e);
        res.json(card);
    });
  })

router.route('/name/:name')
  .get((req,res) => {
    elasticClient.search({
      index:"pokedex",
      body: {
        query: {
          wildcard: {
            name: `*${req.params.name}*`
          }
        }
      }
    })
      .then((body) => {
        var allPokemon = body.hits.hits.map((pokemon) => {
          return pokemon._source.name;
        })
        res.json(allPokemon);
    })
      .catch((e) => {
        console.error(e);
        res.json(card);
    });
  })


router.route('/nameStarts/:name')
  .get((req,res) => {
      elasticClient.search({
        body: {
          query: {
            prefix : { name : req.params.name }
          }
        }
      })
        .then((body) => {
          var allPokemon = body.hits.hits.map((pokemon) => {
            return pokemon._source.name;
          })
          res.json(allPokemon);
      })
        .catch((e) => {
          console.error(e);
          res.json(card);
      });
    })

router.route('/typeOr/:type')
  .get((req,res) => {
      elasticClient.search({
        body: {
          query: {
            match : { types : req.params.type }
          }
        }
      })
        .then((body) => {
          res.json(body.hits.total);
      })
        .catch((e) => {
          console.error(e);
          res.json(card);
      });
    })

router.route('/typeAnd/:type1/:type2')
  .get((req,res) => {
    console.log('req.params: ', req.params);
    console.log('req.params.type: ', req.params.type)
      elasticClient.search({
        body: {
          query: {
              query_string : {
                default_field : 'types',
                query : `${req.params.type1} AND ${req.params.type2}`
            }
          }
        }
      })
        .then((body) => {
          console.log('body: ', body);
          res.json(body.hits.total);
      })
        .catch((e) => {
          console.error(e);
          res.json(card);
      });
    })

module.exports = router;