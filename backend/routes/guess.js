const router = require('express').Router();
let Sketches = require('../models/sketches.model');

var choices = []
var answer = ""

function getChoices(categories) {
    choices = []
    while(choices.length < 5){
        let num = Math.floor(Math.random() * (categories.length))
        if (choices.includes(categories[num]) === false)
            choices.push(categories[num])
        console.log(num, choices)
    }
    answer = choices[Math.floor(Math.random()*5)]
    return [choices, answer]
} 

function getCategories(fromDb) {
    const categories = fromDb
    return categories
}

router.route('/').get((req, res) => {
    res.send("GUESS PAGE!");
});

router.route('/fetchOptions').get((req, res) => {
    Sketches.aggregate([
        {
            $group: { _id: null, uniqueValues: {$addToSet: "$word"}}
        }
    ])
        //.then(sketches => res.json(sketches))
        .then(sketches =>
            res.json(getChoices(getCategories(sketches[0]['uniqueValues'])))
        )
});

router.route('/fetchDrawing').get((req, res) => {
    res.send("Get the Drawing!")
});



module.exports = router;