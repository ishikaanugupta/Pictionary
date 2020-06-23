const express = require('express');
//const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const url = 'mongodb://127.0.0.1:27017/Doodles'
mongoose.connect(url, { useNewUrlParser: true })
const db = mongoose.connection
db.once('open', _ => {
    console.log('Database connected: ', url)
})

db.on('error', err => {
    console.error('connection error: ', err)
})

//app.use(cors());
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