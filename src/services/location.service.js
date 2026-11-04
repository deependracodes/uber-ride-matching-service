const redisClient = require("./utils/redisClient");


class LocationService {

    async addDriverLocation(driverId, latitude, longitude) {
        try {

            await redisClient.sendCommand(
                [
                    "GEOADD",
                    "drivers",
                    latitude.toString(),
                    longitude.toString(),
                    driverId.toString()
                ]
            )
        } catch (e) {
           console.log("error adding location to redis", e)
        }
    }

}


module.exports = new LocationService();

