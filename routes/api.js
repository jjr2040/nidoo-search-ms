const express = require('express');
const ParkingLot = require('../schemas/ParkingLot');
const router = express.Router();


router
.get('/parkinglots', (req, res) => {

    const lng = parseFloat(req.query.lng) 
    const lat = parseFloat(req.query.lat);
    const limit = parseInt(req.query.limit);

    ParkingLot.find({
        location: {
            $near: {
                $maxDistance: 1000,
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                }
            }
        }
    }, null, {limit: limit}, (err, parkinglots) => {
        res.json(parkinglots);
    });
});

router.get('/hello', (req, res) => {
    res.send('Hello world jose');
});

module.exports = router;
