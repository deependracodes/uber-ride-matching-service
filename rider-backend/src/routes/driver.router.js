const express = require("express");
const { updateLocationHandler, acceptRideHandler, rideHistoryHandler } = require("../controllers/driver.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const driverRouter = express.Router();


driverRouter.post("/location",authMiddleware , updateLocationHandler);

driverRouter.post("/accept", acceptRideHandler);

driverRouter.get("/bookings", rideHistoryHandler);



module.exports = driverRouter;
