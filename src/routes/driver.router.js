const express = require("express");
const { updateLocationHandler, acceptRideHandler, rideHistoryHandler } = require("../controllers/driver.controller");

const driverRouter = express.Router();


driverRouter.post("/location", updateLocationHandler);

driverRouter.post("/accept", acceptRideHandler);

driverRouter.get("/bookings", rideHistoryHandler);



module.exports = driverRouter;
