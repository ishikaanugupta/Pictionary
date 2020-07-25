const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

//const url = 'mongodb://127.0.0.1:27017/Doodles'
//mongoose.connect(url, { useNewUrlParser: true })
//mongoose.connection.once('open', _ => {
//    console.log('Database connected: ', url)
//})
//mongoose.connection.on('error', err => {
//    console.error('connection error: ', err)
//})

const uri = "mongodb+srv://afrin:AccessGranted@cluster0.owtuu.mongodb.net/Doodles?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => {
        console.log('Database Connected!')
    })
    .catch( err => console.log('Database Not Connected: ', err))

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const drawRouter = require('./routes/draw');
const guessRouter = require('./routes/guess');

app.use('/draw', drawRouter);
app.use('/guess', guessRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});