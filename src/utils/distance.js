// function calculates the shortest distance ("great-circle distance") between two points on the Earth's surface using their latitudes and longitudes, factoring in the Earth's curvature.
function haversineDistance(lat1, lon1, lat2, lon2, unit = 'km') {
    // Mean radius of the Earth for different units
    const EARTH_RADIUS = {
        km: 6371,
        m: 6371000,
        mi: 3958.8
    };

    // Helper to convert degrees to radians
    const toRadians = (degree) => (degree * Math.PI) / 180;

    // Convert coordinates from degrees to radians
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const rLat1 = toRadians(lat1);
    const rLat2 = toRadians(lat2);

    // Haversine formula
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(rLat1) * Math.cos(rLat2) * Math.sin(dLon / 2) ** 2;
              
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Get the radius for the requested unit (defaults to 'km' if invalid unit passed)
    const radius = EARTH_RADIUS[unit] || EARTH_RADIUS.km;

    return radius * c;
}


module.exports = {haversineDistance};
