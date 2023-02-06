const Thoughts = require('../models/thought');
const Users = require('../models/user');

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

// Thoughts find
async function getAllThoughts(req, res) {
    try {
        const rt = await Thoughts.find({});
        return rj(res, rt);
    } catch (re) { return rj(res, 'An error has occurred. Please try again.', 500); }
};

// Thoughts findOne
async function getOneThought(req, res) {
    try {
        const rt = await Thoughts.findOne({ _id: req.params.thoughtId });
        // given what is returned
        if (rt) {
            return rj(res, rt);
        } else {
            return rj(res, 'try another id', 400);
        };
    } catch (re) { return rj(res, 'An error has occurred. Please try again.', 500); }
};

// Thoughts create
async function addThought(req, res) {
    try {
        const rt = await Thoughts.create(req.body);
        // $push id (thoughts)
        await Users.updateOne(
            { _id: req.body.userId },
            { $push: { thoughts: rt._id } },
        );
        return rj(res, rt);
    } catch (re) { return rj(res, 'An error has occurred. Please try again.', 500); }
};

// Thoughts updateOne
async function updateThought(req, res) {
    try {
        // Thoughts findOne
        const rt = await Thoughts.findOne({ _id: req.params.thoughtId });
        // given what is returned
        if (rt) {
            // updateOne
            // $set thoughtText
            await Thoughts.updateOne(
                { _id: req.params.thoughtId },
                { $set: { thoughtText: req.body.thoughtText } },
                { upsert: true }
            );
            Thoughts.findOne({ _id: req.params.thoughtId }).then((d) => rj(res, d));
        } else {
            return rj(res, 'try another id', 400);
        };
    } catch (re) { return rj(res, 'An error has occurred. Please try again.', 500); }
};

// Thoughts findOneAndRemove
async function deleteThought(req, res) {
    try {
        const rt = await Thoughts.findOneAndRemove({ _id: req.params.thoughtId });
        // given what is returned
        if (rt) {
            // findOneAndUpdate
            // $pull
            await Users.findOneAndUpdate(
                { username: rt.username },
                { $pull: { thoughts: req.params.thoughtId}}
                );
            return rj(res, 'thought - deleted');
        } else {
            return rj(res, 'try another id', 400);
        };
    } catch (re) { return rj(res, 'An error has occurred. Please try again.', 500); }
};

module.exports = { getAllThoughts, getOneThought, addThought, updateThought, deleteThought, rj };