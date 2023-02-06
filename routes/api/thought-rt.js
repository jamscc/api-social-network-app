const { getAllThoughts, getOneThought, addThought, rj } = require('../../controllers/thoughtsCtr');
const thoughtsRtr = require('express').Router();

// thoughts - get (all); 
// thought - post
thoughtsRtr.route('/').get(getAllThoughts).post(addThought);

thoughtsRtr.route('/:thoughtId').get(getOneThought);

module.exports = thoughtsRtr;