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
    })
      .then((body) => {
        var allPokemon = body.hits.hits.map((pokemon) => {
          return pokemon._source;
        })
        res.json(allPokemon);
    })
      .catch((e) => {
        console.error(e);
        res.json(card);
    });
  })

module.exports = router;