const bookingService = require("../services/booking.service.js");


async function createBookingHandler(params) {

    try {

        const { source , destination} = req.body;

        // create a booking object in mongodb
        const bookingService = await bookingService.createBookingHandler({
            passengerId : req.user._id,
            source,
            destination
        })

        // automatically find nearby driver using redis db
        

        // notify the drivers


    } catch (error) {
        
    }
    
}


async function addFeedBackHandler(params) {
}



async function rideHistoryHandler(params) {
}


module.exports = {
    createBookingHandler,
    addFeedBackHandler,
    rideHistoryHandler
};
