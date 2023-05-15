const mongoose = require("mongoose");

const databaseSchema = new mongoose.Schema({
    arrivalDate: {
        required: true,
        type: Date,
        default: Date.now
    },
    departureDate: {
        required: true,
        type: Date
    },

    grownUps: {
        required: true,
        type: Number
    },
    kids: {
        type: Number,
        default: 0
    }

})

module.exports = mongoose.model("booking", databaseSchema);