const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
  // car: { type: Schema.Types.ObjectId, ref: 'Cars' },
  car_id : {type: String, required: true},
  user_id : {type: String, required: true},
  date_from : {type: Date, required: true},
  date_to : {type: Date, required: true}
});

module.exports = mongoose.model('Booking', BookingSchema);
