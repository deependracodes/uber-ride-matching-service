const locationService = require("./location.service");
const userRepository = require("../repositories/user.repository");



async function updateLocation(driverId, { latitude, longitude }) {

    const lat = parseFloat(latitude);
    const long = parseFloat(longitude);

    try {

        // update in redis db
        const res = await locationService.addDriverLocation(
            driverId,
            long,
            lat,
        )

        console.log("updated in redis", res)

        // update in mongo db
        await userRepository.updateLocation(driverId,
            {
                type: "Point",
                coordinates: [long, lat]
            })

    } catch (err) {
        console.log(err)
    }

}

module.exports = {
    updateLocation
}