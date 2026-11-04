const locationService = require("./location.service");



async function updateLocation(driverId,{latitude,longitude}){
    
    const lat = parseFloat(latitude);
    const long = parseFloat(longitude);

    try{

        // update in redis db
        const res= await locationService.addDriverLocation(
            driverId,
            lat,
            long
        )

    }catch(err){
        console.log(err)
    }

    // update in db also

}

module.exports = {
  updateLocation
}