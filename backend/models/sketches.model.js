const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sketchesSchema = new Schema({
    word: String,
    drawing: Array
});

const Sketches = mongoose.model('Sketches', sketchesSchema, 'Sketches');

module.exports = Sketches;