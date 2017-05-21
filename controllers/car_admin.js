//User controlle handles routes for user functions

const express = require('express');
const router = express.Router();
const Cars = require('../models/car_admin')

//Add a new car
router.post('/', (req, res) => {
  var cars = new Cars(req.body);
  cars.save(error => {
    if (error) res.json({ message: error })
    else {
      res.redirect('/admin');
    }
  });

});

//Delete a car
router.delete('/', (req, res) => {
  Cars.remove({ _id: req.body.id }, error => {
    if (error) res.json({ message: error })
    else {
      res.json({ message: 'success' })
    }
  });
});

//Update a car
router.patch('/', (req, res) => {
  Cars.findOneAndUpdate({ _id: req.body.id }, {$set:{
    typ: req.body.typ,
    automat: req.body.automat,
    rail: req.body.rail,
    price: req.body.price,
    booked: req.body.booked
  }}, error => {
    if (error) res.json({ message: error })
    else {
      res.json({ message: 'success' })
    }
  });
});

module.exports = router
