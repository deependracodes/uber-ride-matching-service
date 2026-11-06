const express = require("express");
const { createBookingHandler } = require("../controllers/passenger.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const passengerRouter = express.Router();


passengerRouter.post("/ride", authMiddleware, createBookingHandler);



module.exports = passengerRouter;

