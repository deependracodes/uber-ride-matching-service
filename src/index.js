const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routes/auth.router");
const driverRouter = require("./routes/driver.router");
dotenv.config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/health", (req, res) => {
    res.status(200).json({ message: "Server is healthy" });
});


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/driver", driverRouter);



app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port " + (process.env.PORT || 3000));
});