const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/unpublished', rejectUnauthenticated, (req, res) => {
  console.log('in admin router get /unpublished');
  let queryText = 'SELECT * FROM "events" WHERE NOT "published";';
  pool.query(queryText)
    .then((response) => res.send(response.rows))
    .catch(() => res.sendStatus(500));
});

router.get('/published', rejectUnauthenticated, (req, res) => {
  console.log('in admin router get /published');
  let queryText = 'SELECT * FROM "events" WHERE "published";';
  pool.query(queryText)
    .then((response) => res.send(response.rows))
    .catch(() => res.sendStatus(500));
});

router.get('/users', rejectUnauthenticated, (req, res) => {
  let queryText = 'SELECT * FROM "user" WHERE "access_level"<$1';
  let values=[req.user.access_level]
  pool.query(queryText, values)
    .then((response) => res.send(response.rows))
    .catch(() => res.sendStatus(500));
});


module.exports = router;
