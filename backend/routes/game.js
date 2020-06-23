const router = require('express').Router();

router.route('/').get((req,res) => {
    res.send('GAME PAGE!')
});

module.exports = router;