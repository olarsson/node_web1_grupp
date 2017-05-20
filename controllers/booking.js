const express = require('express');
const router = express.Router();
const Booking = require('../models/booking')

 router.post('/', (req, res) => {
  var booking = new Booking(req.body);
  booking.save(error => {
    if (error) res.json({ message: error })
    else {
      res.redirect('/min-sida');
    }
  });

});


module.exports = router;