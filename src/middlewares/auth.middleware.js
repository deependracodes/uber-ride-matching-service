const { findById } = require("../repositories/user.repository");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.replaceOne("Bearer ", "");

    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verfiy(token, process.env.JWT_SECRET);

        const user = await findById(verified.id);

        if(!user) res.status(400).send("User Not Found");
        
        req.user = user
        next()
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
}

module.exports = authMiddleware