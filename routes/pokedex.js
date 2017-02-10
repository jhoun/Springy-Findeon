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

router.route('/name/:id')
  .get((req,res) => {
    console.log('req.params.id: ', req.params.id);
    elasticClient.search({
      index:"pokedex",
      body: {
        query: {
          wildcard: {
            name: `*${req.params.id}*`
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


router.route('/nameStarts/:id')
  .get((req,res) => {
      console.log('req.params.id: ', req.params.id);
      elasticClient.search({
        body: {
          query: {
            prefix : { name : req.params.id }
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

router.route('/type/:id')
  .get((req,res) => {
      console.log('req.params.id: ', req.params.id);
      elasticClient.search({
        body: {
          query: {
            match : { types : req.params.id }
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

module.exports = router;