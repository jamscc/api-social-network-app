// connection
const cn = require('./config/connection');
// express 
const express = require('express');
const jsonParse = express.json();
const urlParse = express.urlencoded({ extended: true });
const sn = express();
// routes
const rts = require('./routes');
// port
const port = 3001;

sn.use(jsonParse);
sn.use(urlParse);
sn.use(rts);
cn.once('open', () => { sn.listen(port, () => { console.info("port: " + port) }) });