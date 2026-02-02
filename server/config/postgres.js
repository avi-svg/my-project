const {Pool} = require('pg');

const pool = new Pool({
  connectionString: process.env.DB_URL,
    ssl: {
    rejectUnauthorized: false  
  }
})

pool.on('connect', () => {
    console.log('connected to the db')
});

module.exports = {
    query: (text, params) => pool.query(text, params),

    getClient: () => pool.connect(),
}