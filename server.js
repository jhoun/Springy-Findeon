const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Elastic = require('./elasticSearch.js');
const pokedex = require('./routes/pokedex');
const elasticsearch = require('./elasticsearch');

app.use(bodyParser.json({
  extended:true
}));

app.use((req, res, next) => {
  next('route');
})

app.use('/api/pokedex', pokedex);

if(process.env.ENVIRONMENT !== 'TEST'){
    app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}


module.exports = app;