const router = require('express').Router();
let drawing = require('../models/drawing.model');

router.route('/').get((req, res) => {
    res.send("GUESS PAGE!");
});


module.exports = router;

