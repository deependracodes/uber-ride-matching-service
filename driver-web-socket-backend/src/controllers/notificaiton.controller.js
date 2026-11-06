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

            // find socket id of the driver
            const socketId = await getDriverSocket(driver);

            if (socketId && io.sockets.sockets.has(socketId)) {
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
    try {
        const { rideId, driverIds } = req.body;

        if (!driverIds || !Array.isArray(driverIds)) {
            return res.status(400).send({
                success: false,
                message: "driverIds array is required",
            });
        }

        const removedDrivers = [];
        const failedDrivers = [];

        for (let i = 0; i < driverIds.length; i++) {
            const driverId = driverIds[i];

            // Get their active socket ID from Redis
            const socketId = await getDriverSocket(driverId);

            if (socketId && io.sockets.sockets.has(socketId)) {
                // Emit event to remove the notification card from their UI
                io.to(socketId).emit("remove-ride-notification", { rideId });
                removedDrivers.push(driverId);
            } else {
                failedDrivers.push(driverId);
            }
        }

        res.status(200).send({
            success: true,
            error: null,
            message: "Ride notification removal processed",
            data: {
                rideId,
                removedDrivers,
                failedDrivers,
            },
        });

    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
            message: "Failed to remove ride notifications",
        });
    }
}

module.exports = {
    notifyDrivers,
    removeRideNotification,
};