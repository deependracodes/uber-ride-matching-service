const driverService = require("../services/driver.service")
const locationService = require("../services/location.service")
const bookingService = require("../services/booking.service");
const axios = require("axios")



async function updateLocationHandler(req, res) {
    try {

        const { latitude, longitude } = req.body;

        if (typeof latitude != "number" || typeof longitude != "number") {
            throw new Error("Invalid Coordinated")
        }


        await driverService.updateLocation(
            req.user._id,
            {
                latitude, longitude
            }
        )

        res.status(201).send({
            success: true,
            error: null,
            message: "Location Updated Successfully"
        })

    } catch (err) {

        res.status(400).send({ error: err.message })

    }
}


async function acceptRideHandler(req, res) {
    try {
        const { bookingId } = req.body;

        const booking = await bookingService.assignDriver(bookingId, req.user._id);

        // get notifed drivers to remove the notification
        const notifiedDrivers = await locationService.getNotifiedDrivers(bookingId);

        try {

            // remove notification for other drivers
            const notificationResponse = await axios.post(
                "http://localhost:3001/api/remove-ride-notification", {
                rideId: bookingId,
                driverIds: notifiedDrivers
            }
            )

            console.log('Successfully removed ride notification', notificationResponse.data)




        } catch (err) {
            console.log('Failed to remove notification', error.message)
        }

        res.status(201).send({
            data: {
                booking
            },
            status: true,
            error: null,
            message: "Booking accepted successfully"
        })

    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}



async function rideHistoryHandler(req, res) {
}


module.exports = {
    updateLocationHandler,
    acceptRideHandler,
    rideHistoryHandler
};
