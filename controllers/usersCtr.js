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

// Users create
async function addUser(req, res) {
    try {
        const rt = await Users.create(req.body);
        return rj(res, rt);
    } catch (re) { return rj(res, re, 400); }
};

// Users updateOne
async function updateUser(req, res) {
    try {
        // Users findOne
        const rt = await Users.findOne({ _id: req.params.userId });
        // given what is returned
        if (rt) {
            // updateOne
            // $set username
            await Users.updateOne(
                { _id: req.params.userId },
                { $set: { username: req.body.username } },
                { upsert: true }
            );

            // update username - thoughts and reactions
            const th = await Thoughts.find({});
            if (th.length > 0) {
                for (let i = 0; i < th.length; i++) {
                    if (th[i].username == rt.username) {
                        await Thoughts.updateOne(
                            { _id: th[i]._id },
                            { $set: { username: req.body.username } },
                            { upsert: true }
                        );
                    };
                    if (th[i].reactions.length > 0) {
                        for (let j = 0; j < th[i].reactions.length; j++) {
                            if (th[i].reactions[j].username == rt.username) {
                                await Thoughts.findOneAndUpdate(
                                    { 'reactions.reactionId': th[i].reactions[j].reactionId },
                                    { $set: { reactions: { username: req.body.username } } },
                                    { upsert: true }
                                );
                            };
                        };
                    };
                };
            };
            return Users.findOne({ _id: req.params.userId }).then((d) => rj(res, d));
        } else {
            return rj(res, 'try another id', 400);
        };
    } catch (re) { return rj(res, 'An error has occurred. Please try again.', 500); }
};

module.exports = { getAllUsers, getOneUser, addUser, updateUser, rj };