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
        console.log(num, choices)
    }
    answer = choices[Math.floor(Math.random()*5)]
    return [choices, answer]
} 


router.route('/').get((req, res) => {
    res.send("GUESS PAGE!");
});

router.route('/fetchOptions').get((req, res) => {
    //const categories = Sketches.distinct('word')
    Sketches.distinct('word', (err, results) => {
        res.json(getChoices(results))  
    })
});

router.route('/fetch/:answer').get((req, res) => {
    console.log(req.params.answer) 
    Sketches.find({ word: req.params.answer })
        .then(results => {
            let rand = Math.floor(Math.random() * 25)
            console.log(rand, results[rand]['word'])
            res.json(results[rand]['drawing'])
        })
});



module.exports = router;