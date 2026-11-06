const { findById } = require("../repositories/user.repository");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "").trim();


    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);


        const user = await findById(verified.id);

        if (!user) res.status(400).send("User Not Found");

        req.user = user
        next()
    } catch (err) {
        res.status(400).send({ message: "Invalid Token", error: err.message });
    }
}

module.exports = authMiddleware