const express = require("express");
const { createBookingHandler, addFeedBackHandler, rideHistoryHandler } = require("../controllers/passenger.controller");

const passengerRouter = express.Router();


passengerRouter.post("/booking", createBookingHandler);

passengerRouter.post("/feedback", addFeedBackHandler);

passengerRouter.get("/bookings", rideHistoryHandler);



module.exports = passengerRouter;
