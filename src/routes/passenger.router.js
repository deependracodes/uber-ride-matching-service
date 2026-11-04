const express = require("express");
const { createBookingHandler, addFeedBackHandler, rideHistoryHandler } = require("../controllers/passenger.controller");

const passengerRouter = express.Router();


module.exports = (io) => {

    passengerRouter.post("/ride", createBookingHandler);

    passengerRouter.post("/feedback", addFeedBackHandler);

    passengerRouter.get("/bookings", rideHistoryHandler);



    return passengerRouter;

}