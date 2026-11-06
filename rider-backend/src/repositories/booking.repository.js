const Booking = require("../models/booking.model");



async function create(data) {
    const booking = new Booking(data);
    await booking.save();
    return booking;
}


async function update(bookingId,driverId,status) {
    let booking = await Booking.findOneAndUpdate(
        {_id:bookingId,status:"pending"},
        {$set:{driver:driverId,status}},
        {new:true}
    )
    return booking;
}

module.exports = {
    create,
    update
};