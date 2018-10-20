const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

const parkingLotModel = new Schema({
    location: {
        type: {
            type: String, 
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    address: String,
    zone: String,
    state: Number,
    vehicleType: String,
    isAvailable: Boolean,
    owner: String
});

module.exports = mongoose.model('ParkingLot', parkingLotModel);