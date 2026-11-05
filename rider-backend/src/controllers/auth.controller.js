const authService = require("../services/auth.service");

async function registerHandler(req, res) {
    try {

        const { user, token } = await authService.register(req.body);


        res.status(201).json({
            message: "User registered successfully",
            data: { user, token },
            success: true,
            error: null
        });

    } catch (err) {
        res.status(400).json({ message: "Bad request", error: err.message })
    }

}


async function loginHandler(req, res) {

    try {

        const { email, password } = req.body;


        const { user, token } = await authService.login({ email, password });


        res.status(200).json({
            message: "User logged in successfully",
            data: { user, token },
            success: true,
            error: null
        });

    } catch (err) {
        res.status(400).json({ message: "Bad request", error: err.message })
    }
}



module.exports = {
    registerHandler,
    loginHandler
};