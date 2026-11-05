const socketIo = require("socket.io")
const express = require("express")
const http = require("http")
const cors = require("cors")
const app = express();


const server = http.createServer(app);

app.use(cors());
app.use(express.json());


const io = socketIo(server,{
    cors : {
        origin : "*",
        methods : ["GET","POST"]
    }
})


module.exports = {
    app,
    server,
    io
}