const Users = require('../models/user');
const Thoughts = require('../models/thought');

// res.json 
// res.status
function rj(res, r, n) {
    const rs = (n) => { return res.status(n) };
    switch (true) {
        case (!n):
            return res.json(r);
        default:
            rs(n);
            return res.json(r);
    };
};

// Users find
async function getAllUsers(req, res) {
    try {
        const rt = await Users.find({});
        return rj(res, rt);
    } catch (re) { return rj(res, 'An error has occurred. Please try again.', 500); }
};

// Users findOne
async function getOneUser(req, res) {
    try {
        const rt = await Users.findOne({ _id: req.params.userId });
        // given what is returned
        if (rt) {
            return rj(res, rt);
        } else {
            return rj(res, 'try another id', 400);
        };
    } catch (re) { return rj(res, 'An error has occurred. Please try again.', 500); }
};

module.exports = { getAllUsers, getOneUser, rj };