//Routes for base pages

const express = require('express');
const router = express.Router();
const Cars = require('../models/car_admin');
const User = require('../models/user');

//Root route, if user is logged in goto min-sida else the login page
router.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/min-sida');
  } else {
    res.render('index.ejs', req.session.user);
  }
});

//Route for editing/adding/removing cars from the db
router.get('/admin', (req, res) => {
  Cars.find(function(err, coll) {
    res.render('car_admin.ejs', {allcars: coll});
  });
});

//Route for signup page
router.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

router.get('/min-sida', (req, res) => {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    var u_id = req.session.user._id;
    Cars.find(function(err, coll) {
      res.render('min-sida.ejs', {
        allcars: coll,
        user_id: u_id
      });
    });
  }
});

module.exports = router
