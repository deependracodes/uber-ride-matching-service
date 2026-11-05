const { app, server, io } = require("./config/app.config");
const notificationRouter = require("./routes/notification.router")
const { setDriverSocket} = require("./services/driver.service")
app.use("/api", notificationRouter);

const PORT = process.env.PORT || 3001

io.on("connection", (socket) => {
    console.log("New Connection : ", socket.id);

    // handle driver login

    socket.on("driver-login", async (data) => {
        try {
            const { driverId } = data;

            await setDriverSocket(driverId, socket.id)

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
            // todo removeDriverSocket
            // const { driverId } = data;

            // await setDriverSocket(driverId, socket.id)

            // socket.emit("login-success", {
            //     message: "Successfuly connected",
            //     driverId
            // })
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