const { connect, set } = require('mongoose');
const mongoose = require('mongoose');

const dbName = 'sntDB';
const connectMDB = `mongodb://localhost/${dbName}`;
const opt = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}
set('strictQuery', false);
// connect
// any errors
connect(connectMDB, opt).catch((e) => handleError(e));

module.exports = mongoose.connection;