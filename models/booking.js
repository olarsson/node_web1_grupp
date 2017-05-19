const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
   // car: { type: Schema.Types.ObjectId, ref: 'Cars' },
    book_from : {type: Date, required: true},
    book_to : {type: Date, required: true}
});

module.exports = mongoose.model('Booking', BookingSchema);