const { getAllThoughts, getOneThought, addThought, updateThought, deleteThought, rj } = require('../../controllers/thoughtsCtr');
const thoughtsRtr = require('express').Router();

// thoughts - get (all); 
// thought - post
thoughtsRtr.route('/').get(getAllThoughts).post(addThought);

// thought (id)
// get, put, and delete
thoughtsRtr.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

module.exports = thoughtsRtr;