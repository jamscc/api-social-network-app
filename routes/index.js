const snRtr = require('express').Router();
const rtAPI = require('./api');
snRtr.use('/api', rtAPI);
snRtr.use('*', (req, res) => { return res.send('try /api/users or /api/thoughts') });

module.exports = snRtr;