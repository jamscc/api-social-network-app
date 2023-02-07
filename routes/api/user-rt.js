const { getAllUsers, getOneUser, addUser, updateUser, deleteDataUser, addListFriend, removeListFriend, rj } = require('../../controllers/usersCtr');
const usersRtr = require('express').Router();

// users - get (all); 
// user - post
usersRtr.route('/').get(getAllUsers).post(addUser);

// user (id)
// get, put, and delete
usersRtr.route('/:userId').get(getOneUser).put(updateUser).delete(deleteDataUser);

// id (friend)
// post and delete 
usersRtr.route('/:userId/friends/:friendId').post(addListFriend).delete(removeListFriend);

module.exports = usersRtr;