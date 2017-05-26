const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Cars = require('../models/car_admin');

//Ny bokning
router.post('/', (req, res) => {
    var booking = new Booking(req.body);
    var carid = req.body.car_id;
    var userid = req.body.user_id;

    //if (req.body.book_from) {
    //Filtrera på datum

    //console.log('-------- FILTRERA PÅ DATUM --------');

    /*var u_id = req.session.user._id;
    Cars.find(function(err, coll) {
      res.render('min-sida.ejs', {
        allcars: coll,
        user_id: u_id
      });
    });*/

    //} else {
    //Ny bokning
    booking.save(error => {
        if (error) res.json({ message: error })
        else {
            Cars.findOneAndUpdate({ _id: carid }, {
                $set: {
                    booked: userid
                }
            }, error => {
                if (error) res.json({ message: error })
                else {
                    res.format({
                        'json': () => res.json(booking),
                        '*/*': () => res.redirect('/min-sida')
                    })
                }
            });
        }
    });
    //}


});


//Avboka en bil
router.delete('/:car_id', (req, res) => {

    var carid = req.params.car_id;

    Booking.remove({ car_id: carid }, error => {
        if (error) res.json({ message: error })
        else {

            Cars.findOneAndUpdate({ _id: carid }, {
                $unset: {
                    booked: 1
                }
            }, error => {
                if (error) res.json({ message: error })
                else {
                    res.json({ message: 'success' })
                }
            });


        }
    });

});


module.exports = router;