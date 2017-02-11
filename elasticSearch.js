const elasticsearch = require('elasticsearch');

const elasticClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

const pokedexJSON = require('./data/pokedex.json');


elasticClient.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: Infinity
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});


// pokedexJSON.map((pokemon, i) =>{
//   elasticClient.create({
//     index: 'pokedex',
//     type: 'pokemon',
//     id: i,
//     body: {
//       name: pokemon.name,
//       totalStats: Number(pokemon.totalStats),
//       HP: Number(pokemon.HP),
//       attack: Number(pokemon.attack),
//       defense: Number(pokemon.defense),
//       spAtk: Number(pokemon.spAtk),
//       spDef: Number(pokemon.spDef),
//       speed: Number(pokemon.speed),
//       types: pokemon.types
//     }
//   }, function (error, response) {
//     if(error){
//       console.log('error: ', error);
//     } else {
//       console.log('response: ', response);
//     }
//   });
// })

// module.exports = (function(){

//   let all = function(){
//     elasticClient.search({
//     })
//       .then((body) => {
//         console.log('body: ', body);
//         return body;
//     })
//       .catch((e) => {
//         console.error(e);
//     })
//   }

//   return{
//     all: all
//   }

// })();



