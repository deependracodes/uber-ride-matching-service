const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;