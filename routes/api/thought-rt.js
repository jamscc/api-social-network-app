const { getAllThoughts, getOneThought, addThought, updateThought, rj } = require('../../controllers/thoughtsCtr');
const thoughtsRtr = require('express').Router();

// thoughts - get (all); 
// thought - post
thoughtsRtr.route('/').get(getAllThoughts).post(addThought);

thoughtsRtr.route('/:thoughtId').get(getOneThought).put(updateThought);

module.exports = thoughtsRtr;