const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

//Schema for user model
const CarsBackend = mongoose.Schema({
    typ: { type: String, required: true },
    automat: { type: Boolean, required: true },
    rail: { type: Boolean, required: true },
    price: { type: Number, required: true },
    booked: { type: ObjectId }
});

module.exports = mongoose.model('Cars', CarsBackend);
