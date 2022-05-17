const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.send('we are on auth');
});

router.post('/', (req, res) =>{
    res.send('updating auth');
});

module.exports = router;