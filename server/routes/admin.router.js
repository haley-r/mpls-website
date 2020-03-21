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

// router.get('/published', rejectUnauthenticated, (req, res) => {
//   let queryText = 'SELECT * FROM "events" WHERE "published";';
//   pool.query(queryText)
//     .then((response) => res.send(response.rows))
//     .catch(() => res.sendStatus(500));
// });

// router.get('/users', rejectUnauthenticated, (req, res) => {
//   console.log('req.user is', req.user)
//   let queryText = 'SELECT * FROM "users";';
//   pool.query(queryText)
//     .then((response) => res.send(response.rows))
//     .catch(() => res.sendStatus(500));
// });


module.exports = router;
