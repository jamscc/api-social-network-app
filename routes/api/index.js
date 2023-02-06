const apiRtr = require('express').Router();
const rtUsers = require('./user-rt');
const rtThoughts = require('./thought-rt');
apiRtr.use('/users', rtUsers);
apiRtr.use('/thoughts', rtThoughts);

module.exports = apiRtr;