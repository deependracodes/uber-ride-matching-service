const express = require("express");
const notificationRouter = express.Router();

const {notifyDrivers,removeRideNotification} = require("../controllers/notificaiton.controller")

notificationRouter.post("/notify-drivers",notifyDrivers)
notificationRouter.post("/remove-ride-notifications",removeRideNotification)

module.exports = notificationRouter;