//User controller hanterar users

const express = require('express');
const router = express.Router();
const User = require('../models/user')

//Skapar en ny användare och  reroutar till root
router.post('/', (req, res) => {
    var user = new User(req.body);
    user.save(error => {
        if (error) res.flash(error)
        else {
            req.session.user = user
            res.redirect('/');
        }
    });
});

//Hanterar användar login
router.post('/login', (req, res) => {
    User.findOne({ 'username': req.body.username }, (error, user) => {
        if (error) console.log(error)
        else if (user) {
            user.checkPassword(req.body.password, (error, match) => {
                if (error) res.flash(error)
                if (match) {
                    req.session.user = user;
                    res.redirect('/')
                } else {
                    res.flash('info', 'username or password where incorrect');
                    res.render('index.ejs');
                }
            });
        } else {
            res.flash('info', 'username or password where incorrect');
            res.redirect('/');
        }
    });
});

//Hanterar användar logout
router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) res.flash(error)
        else res.redirect('/')
    })
});

//Hämtar användare, returnerar info som json
router.get('/:username', (req, res) => {
    User.findOne({ 'username': req.params.username }, 'username', (error, user) => {
        if (error) res.flash(error)
        else {
            res.json(user);
        }
    });
});

module.exports = router