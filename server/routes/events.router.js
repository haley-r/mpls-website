const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//select all events that are marked as published
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "events" WHERE "published";';
    pool.query(queryText)
        .then((response) => res.send(response.rows))
        .catch(() => res.sendStatus(500));
});


/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('why the fuck will this not work');
    const queryText = `INSERT INTO "events" ("title", "description") VALUES ('a fake event title', 'a test description');`;
    pool.query(queryText)
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
});

module.exports = router;

