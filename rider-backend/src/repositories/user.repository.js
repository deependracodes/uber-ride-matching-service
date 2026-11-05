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
    return await User.findOne({ _id: id });
}



async function updateLocation(driverId, location) {
    return await User.findOneAndUpdate({ _id: id }, {
        $set: {
            locationa
        }
    },{new:true});
}

module.exports = {
    create,
    findByEmail,
    findById,
    updateLocation
};