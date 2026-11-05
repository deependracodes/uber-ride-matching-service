const { redisClient } = require("../utils/redis.client");

async function setDriverSocket(driverId, socketId) {
    try {
        await redisClient.hSet("driverSockets", driverId, socketId)
    } catch (error) {
        throw new Error(error);

    }
}

async function getDriverSocket(driverId) {
    try {
        await redisClient.hGet("driverSockets", driverId)
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    setDriverSocket,
    getDriverSocket,

}