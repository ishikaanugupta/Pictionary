const router = require('express').Router();

router.route('/').get((req, res) => {
    res.send('DRAW PAGE!');
});

module.exports = router;