const router = require('express').Router({ mergeParams: true });
let Sketches = require('../models/sketches.model');

let choices = []
let answer = ""

function getChoices(categories) {
    choices = []
    while(choices.length < 5){
        let num = Math.floor(Math.random() * (categories.length))
        if (choices.includes(categories[num]) === false)
            choices.push(categories[num])
    }
    answer = choices[Math.floor(Math.random()*5)]
    return [choices, answer]
} 

router.route('/fetchOptions').get((req, res) => {
    Sketches.distinct('word', (err, results) => {
        res.json(getChoices(results))  
    })
});

router.route('/fetch/:answer').get((req, res) => {
    Sketches.find({ word: req.params.answer })
        .then(results => {
            let rand = Math.floor(Math.random() * 25)
            res.json(results[rand]['drawing'])
        })
});

module.exports = router;