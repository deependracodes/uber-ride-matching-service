const User = require("../models/user.model");


async function create(data) {
    const user = new User(data);
    await user.save();
    return user;
}

async function findByEmail(email) {
    return await User.findOne({ email });
}

module.exports = {
    create,
    findByEmail
};