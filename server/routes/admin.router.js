const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/unpublished', rejectUnauthenticated, (req, res) => {
  let queryText = 'SELECT * FROM "events" WHERE NOT "published";';
  pool.query(queryText)
    .then((response) => res.send(response.rows))
    .catch(() => res.sendStatus(500));
});//gets unpublished events
router.get('/published', rejectUnauthenticated, (req, res) => {
  let queryText = 'SELECT * FROM "events" WHERE "published";';
  pool.query(queryText)
    .then((response) => res.send(response.rows))
    .catch(() => res.sendStatus(500));
});//gets published events
router.get('/users', rejectUnauthenticated, (req, res) => {
  let queryText = 'SELECT * FROM "user" WHERE "access_level"<$1';
  let values=[req.user.access_level]
  pool.query(queryText, values)
    .then((response) => res.send(response.rows))
    .catch(() => res.sendStatus(500));
});//gets users with access levels below current user

router.put('/publish/:eventId', rejectUnauthenticated, (req, res) => {
  let queryText = 'UPDATE "events" SET "published"=true WHERE "events"."id"=$1;';
  let values = [req.params.eventId]
  pool.query(queryText, values)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});//sets to published!

router.delete('/delete/:eventId', rejectUnauthenticated, (req, res) => {
  let queryText = 'DELETE FROM "events" WHERE "id"=$1;';
  let values = [req.params.eventId]
  pool.query(queryText, values)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});//deletes selected event


module.exports = router;
