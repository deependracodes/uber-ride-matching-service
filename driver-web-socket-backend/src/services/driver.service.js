const { redisClient } = require("../utils/redis.client");

async function setDriverSocket(driverId, socketId) {
    try {
        await redisClient.hSet("driver_sockets", driverId, socketId)
    } catch (error) {
        throw new Error(error);

    }
}

async function getDriverSocket(driverId) {
    try {
        return await redisClient.hGet("driver_sockets", driverId)
    } catch (error) {
        throw new Error(error);
    }
}

async function removeDriverSocket(driverId) {
    try {
        await redisClient.hDel("driver_sockets", driverId);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    setDriverSocket,
    getDriverSocket,
    removeDriverSocket,
};