const mongoose = require('mongoose');

//Schema for user model
const CarsBackend = mongoose.Schema({
    typ: { type: String, required: true },
    automat: { type: Boolean, required: true },
    rail: { type: Boolean, required: true },
    price: { type: Number, required: true },
    booked: { type: String }
});

module.exports = mongoose.model('Cars', CarsBackend);
