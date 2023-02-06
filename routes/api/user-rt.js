const { getAllUsers, getOneUser, addUser, rj } = require('../../controllers/usersCtr');
const usersRtr = require('express').Router();

// users - get (all); 
// user - post
usersRtr.route('/').get(getAllUsers).post(addUser);

usersRtr.route('/:userId').get(getOneUser);

module.exports = usersRtr;