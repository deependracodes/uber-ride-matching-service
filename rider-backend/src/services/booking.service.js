const bookingRepository = require("../repositories/booking.repository");
const { haversineDistance } = require("../utils/distance");
const locationService = require("./location.service");

const BASIC_FARE = 50;
const RATE_PER_KM = 12;

async function createBooking({
    passengerId,
    source,
    destination
}) {


    const distance = haversineDistance(
        source.latitude,
        source.longitude,
        destination.latitude,
        destination.longitude
    )

    // static calc, but should call fare service
    const fare = BASIC_FARE * (distance * RATE_PER_KM)


    const bookingData = {
        passenger: passengerId,
        source,
        destination,
        fare,
        distance
    }


    const booking = await bookingRepository.create(bookingData);


    return booking;
}



async function findNearByDrivers(source,radius=5) {
    const longitude = parseFloat(source.longitude)
    const latitude = parseFloat(source.latitude)
    const radiusInKm = parseFloat(radius)

    const drivers = await locationService.nearByDrivers(longitude,latitude,radiusInKm)
   
    return drivers;
}





module.exports = {
    createBooking,
    findNearByDrivers
}