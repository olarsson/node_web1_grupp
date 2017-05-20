const express = require('express');
const router = express.Router();
const Booking = require('../models/booking')

//Ny bokning
router.post('/', (req, res) => {
  var booking = new Booking(req.body);
  booking.save(error => {
    if (error) res.json({ message: error })
    else {
      res.redirect('/min-sida');
    }
  });
});


//Avboka en bil
router.delete('/', (req, res) => {

  var carid = req.body.car_id;

  Booking.remove({ car_id: carid }, error => {
    if (error) res.json({ message: error })
    else {
      res.json({ message: 'success' })
    }
  });

});


module.exports = router;
