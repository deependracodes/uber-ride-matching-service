const driverService = require("../services/driver.service")

async function updateLocationHandler(params) {
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


async function acceptRideHandler(params) {
}



async function rideHistoryHandler(params) {
}


module.exports = {
    updateLocationHandler,
    acceptRideHandler,
    rideHistoryHandler
};
