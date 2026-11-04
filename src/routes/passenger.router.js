const express = require("express");
const { createBookingHandler, addFeedBackHandler, rideHistoryHandler } = require("../controllers/passenger.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const passengerRouter = express.Router();


passengerRouter.post("/ride", authMiddleware, createBookingHandler);

passengerRouter.post("/feedback", addFeedBackHandler);

passengerRouter.get("/bookings", rideHistoryHandler);



module.exports = passengerRouter;

