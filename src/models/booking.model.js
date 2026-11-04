const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    passenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
        default: null
    },

    fare: {
        type: Number,
        default: 0,
        comment: "Static field can add X fare"
    }
    ,
    status: {
        type: String,
        enum: ["pending", "confirmed", "accepted", "completed", "cancelled"],
        default: "pending"
    },

    source: {
        latitude: {
            type: Number,
            required: true
        },
        longitute: {
            type: Number,
            required: true
        }
    },

    destination: {
        latitude: {
            type: Number,
            required: true
        },
        longitute: {
            type: Number,
            required: true
        }
    },

    raing: { type: Number, enum: [1, 2, 3, 4, 5], defualt: 3 },

    feedBack: { type: String, defualt: "" }

}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;