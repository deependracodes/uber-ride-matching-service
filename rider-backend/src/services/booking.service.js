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

    if(isNaN(longitude) || isNaN(latitude) || isNaN(radiusInKm)){
        throw new Error("Invalid coordinates");
    }

    // call redis db
    const drivers = await locationService.nearByDrivers(longitude,latitude,radiusInKm)
   
    return drivers;
}


async function assignDriver(bookingId,driverId) {
    
    const booking = await bookingRepository.update(
        bookingId,
        driverId,
        "confirmed"
    )

    if(!booking){
        throw new Error("Booking already confirmed or does not exists")
    }

    return booking;
}





module.exports = {
    createBooking,
    findNearByDrivers,
    assignDriver
}