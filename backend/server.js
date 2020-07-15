const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
let doodleCategories = []

const url = 'mongodb://127.0.0.1:27017/Doodles'
mongoose.connect(url, { useNewUrlParser: true })
mongoose.connection.once('open', _ => {
    console.log('Database connected: ', url)
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        names.forEach(element => {
            doodleCategories.push(element.name)
        });
        console.log(doodleCategories);
        console.log("DEAR LORD!")
        exports.doodleCategories = doodleCategories; 
    });
})

mongoose.connection.on('error', err => {
    console.error('connection error: ', err)
})

app.use(cors());
app.use(express.json());

const gameRouter = require('./routes/game');
const drawRouter = require('./routes/draw');
const guessRouter = require('./routes/guess');

app.use('/', gameRouter);
app.use('/draw', drawRouter);
app.use('/guess', guessRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});