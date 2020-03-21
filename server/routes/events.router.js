const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('req.body:', req.body);
    console.log('is there a user?', req.user);
    let queryText = 'SELECT * FROM "events";';
    pool.query(queryText)
        .then((response) => res.send(response.rows))
        .catch(() => res.sendStatus(500));
});


/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;