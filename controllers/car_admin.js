//User controller hanterar routes för cars

const express = require('express');
const router = express.Router();
const Cars = require('../models/car_admin')

//Lägg till en ny bil
router.post('/', (req, res) => {
    var cars = new Cars(req.body);
    cars.save(error => {
        if (error) res.json({ message: error })
        else {
            res.format({
                'json': () => res.json(cars),
                '*/*': () => res.redirect('/admin')
            });
        }
    });
});


//Hämtar en bil
router.get('/:id', (req, res) => {
    Cars.findById(req.params.id, (err, data) => {
        if (err) res.json(err)
        else res.json(data)
    });
})

//Raderar en bil
router.delete('/:id', (req, res) => {
    Cars.remove({ _id: req.params.id }, error => {
        if (error) res.json({ message: error })
        else res.json({ message: 'success' })
    });
});

//Updaterar en bil
router.patch('/:id', (req, res) => {
    Cars.findOneAndUpdate({ _id: req.params.id }, { $set: req.body },
        error => {
            if (error) res.json({ message: error })
            else {
                res.format({
                    'json': () => Cars.findById(req.params.id, (err, data) => {
                        if (err) res.json(err)
                        else res.json(data)
                    }),
                    'default': () => res.json({ message: 'success' })
                });
            }
        });
});

module.exports = router