const dotenv = require("dotenv");
dotenv.config();

const connectToMongoDB = require("./utils/mongoClient");
// const redisClient = require("./utils/redisClient");
const express = require("express");
const http = require("http");
const cors = require("cors");


const authRouter = require("./routes/auth.router");
const driverRouter = require("./routes/driver.router");
const passengerRouter = require("./routes/passenger.router");


const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/public", express.static("public"));

// server public/driver.html file
app.get("/public/driver.html", (req, res) => {
    res.sendFile(__dirname + "/public/driver.html");
});



app.use("/health", (req, res) => {
    res.status(200).json({ message: "Server is healthy" });
});


app.use("/api/auth", authRouter);
app.use("/api/passenger", passengerRouter);
app.use("/api/driver",driverRouter)


app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.status || (err.code === "AUTH_INVALID_CREDENTIALS" ? 401 : 500);
    res.status(statusCode).json({ message: err.message || "Internal Server Error" });
});



server.listen(process.env.PORT || 3000, async() => {
    await connectToMongoDB();
    console.log("Server is running on port " + (process.env.PORT || 3000));
});