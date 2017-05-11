//Routes for base pages

const express = require('express');
const router = express.Router();

//Root route, if user is logged in goto index else the signup page
router.get('/', (req, res) => {
    if (!req.session.user) {
        res.redirect('/signup');
    }
    res.render('index.ejs', req.session.user);
});

//Route for editing/adding/removing cars from the db
router.get('/cars', (req, res) => {
    res.render('car_admin');
});

//Route for signup page
router.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

//Route for login page
router.get('/login', (req, res) => {
    res.render('login.ejs');
});

module.exports = router
