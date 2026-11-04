const User = require("../models/user.model");


async function create(data) {
    const user = new User(data);
    await user.save();
    return user;
}

async function findByEmail(email) {
    return await User.findOne({ email });
}



async function findById(id) {
    return await User.findOne({ _id : id });
}


module.exports = {
    create,
    findByEmail,
    findById
};