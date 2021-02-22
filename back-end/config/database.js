require('dotenv').config()

try {
  var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : process.env.DBUSER,
      password : process.env.DBPASS,
      database : process.env.DBNAME
    }
  });  
} catch (error) {
  console.log(error)
}

module.exports = knex