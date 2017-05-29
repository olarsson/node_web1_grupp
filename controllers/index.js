//Huvud controller. Laddas av app.js. Laddar alla andra controllers

const express = require('express');
const router = express.Router();

//Controllers att ladda
router.use('/', require('./home'));
router.use('/users', require('./user'));
router.use('/cars', require('./car_admin'));
router.use('/bookings', require('./booking'));

module.exports = router