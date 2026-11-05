const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");

function signToken(userId) {


    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        });

}


async function register(data) {
   const user = await userRepository.create(data);

   const token = signToken(user._id.toString());

   return { user, token };
}



async function login({ email, password }) {
   const user = await userRepository.findByEmail(email);

   if (!user) {
       throw new Error("User not found");
   }

   const isMatch = await user.comparePassword(password, user.password);

   if (!isMatch) {
       throw new Error("Invalid credentials");
   }

   const token = signToken(user._id.toString());

   return { user, token };
}


module.exports = {
    register,
    login
};


