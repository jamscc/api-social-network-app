const { getAllUsers, getOneUser, addUser, updateUser, rj } = require('../../controllers/usersCtr');
const usersRtr = require('express').Router();

// users - get (all); 
// user - post
usersRtr.route('/').get(getAllUsers).post(addUser);

usersRtr.route('/:userId').get(getOneUser).put(updateUser);

module.exports = usersRtr;