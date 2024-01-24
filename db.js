const Pool = require("pg").Pool;

const pool = new Pool({
  user: "teesha",
  host: "localhost",
  database: "twitterlogin",
  password: "teesha",
  port: 5432,
});

module.exports = pool;
