//Main controller loaded by app. Loads all other controllers

const express = require('express');
const router = express.Router();

//Controllers to load
router.use('/',       require('./home'));
router.use('/user',   require('./user'));
router.use('/admin',   require('./car_admin'));
router.use('/min-sida',   require('./booking'));
router.use('/boka-bil',   require('./booking'));
module.exports = router
