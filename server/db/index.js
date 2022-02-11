const { Pool } = require("pg");

// connect to postgres db, it knows to look in .env
const pool = new Pool();

module.exports = {
  query: (text, params) => pool.query(text, params),
};