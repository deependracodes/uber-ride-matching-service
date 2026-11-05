const { io } = require("../config/app.config");
const { getDriverSocket } = require("../services/driver.service")

async function notifyDrivers(req, res) {
    try {
        const { rideId, rideInfo, driverIds } = req.body;

        const notificationData = {
            rideId,
            rideInfo,
            timeStamp: new Date().toISOString()
        };

        const notifiedDrivers = []
        const failedDrivers = []
        for (let i = 0; i < driverIds.length; i++) {
            const driver = driverIds[i];

            const socketId = await getDriverSocket(driver);

            if (socketId) {
                io.to(socketId).emit("new-ride-notification", notificationData);
                notifiedDrivers.push(driver)
            } else {
                failedDrivers.push(driver)
            }

        }

        const result = {
            notifiedDrivers,
            failedDrivers,
            totalNotified: notifiedDrivers.length
        }

        res.status(200).send({
            data: {
                data: {
                    rideId,
                    ...result
                },
                succes: true,
                error: null,
                message: "Successfully notified drivers",

            }
        })

    } catch (error) {
        res.status(500).send({
            data: null,
            succes: false,
            error: error.message,
            message: "Failed to notify drivers",
        })
    }
}



async function removeRideNotification(req, res) {

}


module.exports = {
    notifyDrivers, removeRideNotification
}