const Booking = require("../models/booking.model");



async function create(data) {
    const booking = new Booking(data);
    await booking.save();
    return booking;
}

module.exports = {
    create
};