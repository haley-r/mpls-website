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
    const queryText = `INSERT INTO "events" ("title", "description") VALUES ($1, $2);`;
    const values = [req.body.title, req.body.description];
    pool.query(queryText, values)
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
});

module.exports = router;

