const bookingService = require("../services/booking.service");
const locationService = require("../services/location.service");
const axios = require("axios")

async function createBookingHandler(req,res) {

    try {

        const { source, destination } = req.body;

        // create a booking object in mongodb
        const booking = await bookingService.createBooking({
            passengerId: req.user._id,
            source,
            destination
        })

        // find nearby driver using redis db
        const nearByDrivers = await bookingService.findNearByDrivers(source)

        console.log("Near by drivers by redis :",nearByDrivers);

        const driverIds = nearByDrivers.map(driver => driver[0]);

        // notify the drivers by establising a socket connection with socker server of driver
        const rideInfo = {
            source,
            destination,
            passengerId: req.user._id,
            estimatedFare: booking.fare,
            distance: booking.distance,
            pickupTime: new Date().toISOString()
        }


        try {

            const notifactionRes = await axios.post("http://localhost:3001/api/notify-drivers", {
                rideId: booking._id.toString(),
                rideInfo,
                driverIds
            })
             
            // storing notified drivers list in redis corresponding a booking 
            await locationService.storeNotifiedDrivers(booking._id, driverIds)
            console.log("Notification sent successfuly", notifactionRes.data)

        } catch (err) {
            console.log("failed to send notification", err.message)

        }

        res.status(201).send({
            data : {
                booking
            },
            status : true,
            error : null,
            message : "Booking created successfully"
        })


    } catch (error) {
        res.status(400).send({ message: error.message })
    }

}


async function addFeedBackHandler(req,res) {
}



async function rideHistoryHandler(req,res) {
}


module.exports = {
    createBookingHandler,
    addFeedBackHandler,
    rideHistoryHandler
};
