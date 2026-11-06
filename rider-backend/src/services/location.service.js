const { redisClient } = require("../utils/redis.client");


class LocationService {
    async addDriverLocation(driverId, longitude,latitude) {
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


    async storeNotifiedDrivers(bookingId, driverIds) {
        for (const driverId of driverIds) {
            const addedCount = await redisClient.sAdd(`notifiedDrivers:${bookingId}`, driverId);
       
            console.log(`Added drivers id : ${driverId} , to set of booking id :${bookingId} : count : ${addedCount}`)
        }
    }

    async getNotifiedDrivers(bookingId) {
        const drivers = await redisClient.sMembers(`notifiedDrivers:${bookingId}`);
        return drivers
    }


    

}


// redis created score based on lat and long , and can help us in finding near by cooorinates

/*

check coordinated of a driver

# GEOPOS drivers <id>

*/


module.exports = new LocationService();

