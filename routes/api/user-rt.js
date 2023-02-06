const { getAllUsers, getOneUser, rj } = require('../../controllers/usersCtr');
const usersRtr = require('express').Router();

usersRtr.route('/').get(getAllUsers);

usersRtr.route('/:userId').get(getOneUser);

module.exports = usersRtr;