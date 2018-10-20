const express = require('express');
const ParkingLot = require('../schemas/ParkingLot');
const router = express.Router();


router
.get('/parkinglots', (req, res) => {

    const lng = parseFloat(req.query.lng) 
    const lat = parseFloat(req.query.lat);
    const limit = parseInt(req.query.limit);
    const maxDistance = parseInt(req.query.maxDistance);

    ParkingLot.find({
        location: {
            $near: {
                $maxDistance: maxDistance,
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                }
            }
        }
    }, null, {limit: limit}, (err, parkinglots) => {
        res.json(parkinglots);
    });
})
.post('/parkinglots', (req, res) => {
    let parkinglot = new ParkingLot(req.body);
    parkinglot.save();
    res.status(201).send(parkinglot);
});

router.get('/hello', (req, res) => {
    res.send('Hello world jose');
});

module.exports = router;
