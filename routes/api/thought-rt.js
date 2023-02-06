const { getAllThoughts, getOneThought, rj } = require('../../controllers/thoughtsCtr');
const thoughtsRtr = require('express').Router();

thoughtsRtr.route('/').get(getAllThoughts);

thoughtsRtr.route('/:thoughtId').get(getOneThought);

module.exports = thoughtsRtr;