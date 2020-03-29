const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//select all events that are marked as published
router.get('/', (req, res) => {
    let queryText = 'SELECT "id","name","shortDescription", "startTime", "endTime","location" FROM "events" WHERE "published" ORDER BY "startTime";';
    pool.query(queryText)
        .then((response) => res.send(response.rows))
        .catch(() => res.sendStatus(500));
});

//select all ids from events that are marked as published
router.get('/ids', (req, res) => {
    let queryText = 'SELECT "id" FROM "events" WHERE "published" ORDER BY "startTime";';
    pool.query(queryText)
        .then((response) => {
            let idArray=[];
            for (idObject of response.rows){
                idArray.push(idObject.id);
            }
            res.send(idArray);
        })
        .catch(() => res.sendStatus(500));
});


//select details for the specific event chosen by id
router.get('/:id', (req, res) => {
    //change this to not include host contact if not public
    let queryText = 'SELECT "id","name","shortDescription","startTime","endTime", "startDateString", "startTimeString", "endDateString", "endTimeString", "location", "fullDescription", "posterLink", "updates", "hostContact", "hostContactPublic" FROM "events" WHERE "id"=$1 AND "published";';
    let values = [req.params.id];
    pool.query(queryText, values)
        .then((response) => res.send(response.rows))
        .catch(() => res.sendStatus(500));
});

router.get('/tags/:id', (req, res) => {
    //get tag names that are applicable to event
    let queryText = `SELECT "tags"."tagName" FROM "tags" 
                    JOIN "events_tags" ON "tags"."id" = "events_tags"."tag_id" 
                    JOIN "events" ON "events"."id" = "events_tags"."event_id"
                    WHERE "events"."id" = $1;`;
    let values = [req.params.id];
    pool.query(queryText, values)
        .then((response) => res.send(response.rows))
        .catch(() => res.sendStatus(500));
});

//post info gathered from form into database
router.post('/', (req, res) => {
    let event=req.body;
    const queryText = 
        `INSERT INTO "events" 
        ("name", "shortDescription", "startTime", "endTime",
        "startDateString", "startTimeString", "endDateString", "endTimeString", "location",
        "fullDescription", "posterLink", "updates", "hostContact", "hostContactPublic")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`;
    const values = [
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
        event.hostContactPublic
    ];
    pool.query(queryText, values)
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));
});



module.exports = router;




