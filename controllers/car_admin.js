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
          res.redirect('/cars');
      }
  });

});

module.exports = router
