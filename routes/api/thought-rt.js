const { getAllThoughts, getOneThought, addThought, updateThought, deleteThought, addReaction, deleteReaction, rj } = require('../../controllers/thoughtsCtr');
const thoughtsRtr = require('express').Router();

// thoughts - get (all); 
// thought - post
thoughtsRtr.route('/').get(getAllThoughts).post(addThought);

// thought (id)
// get, put, and delete
thoughtsRtr.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

// reaction - post
thoughtsRtr.route('/:thoughtId/reactions').post(addReaction);

// reaction - delete
thoughtsRtr.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = thoughtsRtr;