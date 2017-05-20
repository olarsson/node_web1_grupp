//Routes for base pages

const express = require('express');
const router = express.Router();
const Cars = require('../models/car_admin');

//Root route, if user is logged in goto index else the signup page
router.get('/', (req, res) => {
  if (!req.session.user) {
    res.redirect('/signup');
  }
  res.render('index.ejs', req.session.user);
});

//Route for editing/adding/removing cars from the db
router.get('/cars', (req, res) => {
  Cars.find(function(err, coll) {
    res.render('car_admin.ejs', {allcars: coll});
  });
});

//Route for signup page
router.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

//Route for login page
router.get('/login', (req, res) => {
  res.render('login.ejs');
});

router.get('/min-sida', (req, res) => {
  res.render('min-sida.ejs');
});

module.exports = router
