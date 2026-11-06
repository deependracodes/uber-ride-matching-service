const express = require("express");
const path = require('path');
const { app, server, io } = require("./config/app.config");
const notificationRouter = require("./routes/notification.router")
const { setDriverSocket, removeDriverSocket } = require("./services/driver.service")


app.use(express.static(path.join(__dirname, 'public')));
app.use("/api", notificationRouter);

const PORT = process.env.PORT || 3001

io.on("connection", (socket) => {
    console.log("New Connection : ", socket.id);

    // handle driver login
    socket.on("driver-login", async (data) => {
        try {
            const { driverId } = data;

            await setDriverSocket(driverId, socket.id)

            console.log("Driver : ", driverId, "connected to socket : ", socket.id)
            socket.emit("login-success", {
                message: "Successfuly connected",
                driverId
            })
        } catch (error) {
            console.log("error set driver socket", error)
            socket.emit("error", {
                message: "Connection failed"
            })
        }
    })

    // handle disconnection
    socket.on("disconnect", async (data) => {
        try {
            const { driverId } = data;

            await removeDriverSocket(driverId);

        } catch (error) {
            console.log("error set driver socket", error)
            socket.emit("error", {
                message: "Connection failed"
            })
        }
    })
})

server.listen(PORT, () => {
    console.log("Driver web-socker server runing on port : ", PORT)
})