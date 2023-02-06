const { getAllUsers, getOneUser, addUser, updateUser, deleteDataUser, rj } = require('../../controllers/usersCtr');
const usersRtr = require('express').Router();

// users - get (all); 
// user - post
usersRtr.route('/').get(getAllUsers).post(addUser);

// user (id)
// get, put, and delete
usersRtr.route('/:userId').get(getOneUser).put(updateUser).delete(deleteDataUser);

module.exports = usersRtr;