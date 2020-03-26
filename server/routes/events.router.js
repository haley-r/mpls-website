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
    let event=req.body;
    const queryText = 
        `INSERT INTO "events" 
        ("name", "short-description", "start-time", "end-time", "location",
        "full-description", "poster-link", "updates", "host-contact", "host-contact-public")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
    const values = [
        event.name,
        event.shortDescription,
        `${event.startDate} ${event.startTime}:00`,
        `${event.endDate} ${event.endTime}:00`,
        event.location,
        event.fullDescription,
        event.posterLink,
        event.updates,
        event.hostContact,
        event.hostContactPublic
    ];
    pool.query(queryText, values)
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
});

module.exports = router;




