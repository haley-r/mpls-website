const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/unpublished', rejectUnauthenticated, (req, res) => {
  let queryText = 'SELECT * FROM "events" WHERE NOT "published" ORDER BY "startTime";';
  pool.query(queryText)
    .then((response) => res.send(response.rows))
    .catch(() => res.sendStatus(500));
});//gets unpublished events
router.get('/published', rejectUnauthenticated, (req, res) => {
  let queryText = 'SELECT * FROM "events" WHERE "published" ORDER BY "startTime";';
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

//select details for the specific event chosen by id
router.get('/details/:id', (req, res) => {  
  //change this to not include host contact if not public
  let queryText = 'SELECT "id","name","shortDescription","startTime","endTime", "startDateString", "startTimeString", "endDateString", "endTimeString","location", "fullDescription", "posterLink", "updates", "hostContact", "hostContactPublic", "published", "flagged" FROM "events" WHERE "id"=$1;';
  let values = [req.params.id];
  pool.query(queryText, values)
    .then((response) => res.send(response.rows))
    .catch(() => res.sendStatus(500));
});

router.put('/publish/:eventId', rejectUnauthenticated, (req, res) => {
  console.log('req.body:', req.body);
  let queryText = 'UPDATE "events" SET "published"=$1 WHERE "events"."id"=$2;';
  let values = [req.body.setTo, req.params.eventId]
  pool.query(queryText, values)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});//sets to published or unpublished

router.put('/flag/:eventId', rejectUnauthenticated, (req, res) => {
  console.log('req.body:', req.body);
  let queryText = 'UPDATE "events" SET "flagged"=$1 WHERE "events"."id"=$2;';
  let values = [req.body.setTo, req.params.eventId]
  pool.query(queryText, values)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});//sets to flagged or unflagged

router.put('/update/:eventId', rejectUnauthenticated, (req, res) => {
  let event = req.body.event;

  let queryText = `UPDATE "events" SET 
  "name" =$1, 
  "shortDescription"=$2, 
  "startTime"=$3, 
  "endTime"=$4,
  "startDateString"=$5, 
  "startTimeString"=$6, 
  "endDateString"=$7, 
  "endTimeString"=$8, 
  "location"=$9,
  "fullDescription"=$10, 
  "posterLink"=$11, 
  "updates"=$12, 
  "hostContact"=$13, 
  "hostContactPublic"=$14
  WHERE "events"."id"=$15;`;
  let values = [
    event.name,
    event.shortDescription,
    `${event.startDate} ${event.startTime}:00`,
    `${event.endDate} ${event.endTime}:00`,
    event.startDate,
    event.startTime,
    event.endDate,
    event.endTime,
    event.location,
    event.fullDescription,
    event.posterLink,
    event.updates,
    event.hostContact,
    event.hostContactPublic,
    req.params.eventId,
  ];
  pool.query(queryText, values)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});//updates all fields besides id, even if same.

router.delete('/delete/:eventId', rejectUnauthenticated, (req, res) => {
  let queryText = 'DELETE FROM "events" WHERE "id"=$1;';
  let values = [req.params.eventId]
  pool.query(queryText, values)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});//deletes selected event


module.exports = router;
