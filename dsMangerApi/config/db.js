const dbConfig = require('./dbConfig')
const knex = require('knex')(dbConfig);

module.exports = knex;