var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV == 'production' ? { rejectUnauthorized: false } : false
});

client.connect();

router.get('/dbtime', function(req, res, next) {
    client.query('SELECT NOW()', (err, dbResult) => {
      if (err) {
        next(err)
      } else {
        res.send({now: dbResult.rows[0]['now']})
      }
    });
});

module.exports = router;
