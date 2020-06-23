const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const drawingSchema = new Schema({
    word: String,
    drawing: Array
});

const Drawing = mongoose.model('Drawing', drawingSchema);

module.exports = Drawing;