const {redisClient} = require("../utils/redis.client");


class LocationService {
    async addDriverLocation(driverId, latitude, longitude) {
        try {

            await redisClient.sendCommand(
                [
                    "GEOADD",
                    "drivers",
                    longitude.toString(),
                    latitude.toString(),
                    driverId.toString()
                ]
            )
        } catch (e) {
            console.log("error adding location to redis", e)
        }
    }

    async nearByDrivers(longitude, latitude, radius) {
        try {

            const drivers = await redisClient.sendCommand(
                [
                    "GEORADIUS",
                    "drivers",
                    longitude.toString(),
                    latitude.toString(),
                    radius.toString(),
                    "km",
                    "WITHCOORD"
                ]
            )

            return drivers
        } catch (e) {
            console.log("error adding location to redis", e)
        }
    }

    async setDriverSocket(driverId, socketId) {
        await redisClient.set(
            `driver:${driverId}`, socketId
        )
    }

    async getDriverSocket(driverId) {
        return await redisClient.get(
            `driver:${driverId}`
        )
    }

    async removeDriverSocket(driverId) {
        return await redisClient.del(
            `driver:${driverId}`
        )
    }

     async removeBySocket(socketId) {
        const driverId = await redisClient.get(socketId);
        await removeDriverSocket(driverId)
    }
}


// redis created score based on lat and long , and can help us in finding near by cooorinates

/*

check coordinated of a driver

# GEOPOS drivers <id>

*/


module.exports = new LocationService();

