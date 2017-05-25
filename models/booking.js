const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const BookingSchema = mongoose.Schema({
  car_id : {type: ObjectId, required: true},
  user_id : {type: ObjectId, required: true},
  typ: { type: String, required: true },
  automat: { type: Boolean, required: true },
  rail: { type: Boolean, required: true },
  price: { type: Number, required: true },
  date_from : {type: Date, required: true},
  date_to : {type: Date, required: true}
});

module.exports = mongoose.model('Booking', BookingSchema);
