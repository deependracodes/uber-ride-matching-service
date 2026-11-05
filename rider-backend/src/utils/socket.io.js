const locationService = require("../services/location.service")

function initSocket(io) {

    io.on('connection', async (socket) => {
        console.log(`New Socket Connected : ${socket.id}`);
        // register driver with socket id
        socket.on("registerDriver", async ({ driverId }) => {
            if (!driverId) return;
            await locationService.setDriverSocket(driverId, socket.id);
            console.log(`Registered driver : ${driverId} with socket : ${socket.id}`);

        })

        socket.on("disconnect", async () => {
            const driverId = await locationService.removeBySocket(socket.id);
            console.log(`Disconnected driver : ${driverId} from socket : ${socket.id}`);
        })
    })

}


module.exports = initSocket;