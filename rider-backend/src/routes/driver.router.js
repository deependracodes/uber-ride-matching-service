const express = require("express");
const { updateLocationHandler, acceptRideHandler } = require("../controllers/driver.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const driverRouter = express.Router();


driverRouter.post("/location",authMiddleware , updateLocationHandler);

driverRouter.post("/confirm",authMiddleware, acceptRideHandler);




module.exports = driverRouter;
