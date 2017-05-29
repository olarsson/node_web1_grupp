//Entry point of backend

const express = require('express');
const session = require('express-session');
const flash = require('express-flash-2');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 3000;

//Sätter upp databasen
const mongoose = require('mongoose');
const configDB = require('./config/database.js');
let db;

mongoose.connect(configDB.uri);

//Sätter view engine
app.set('view engine', 'ejs');

//Laddar och konfigurerar middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'jätte hemligt',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(__dirname + '/public'));
app.use(flash());
app.locals.moment = moment;

//Laddar controller
app.use(require('./controllers'));

app.listen(port, function() {
    console.log('Listening on port ' + port + '...');
});

module.exports = app;