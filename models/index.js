const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url
db.address = require('./address.model.js')(mongoose);
db.person = require('./person.model.js')(mongoose);

module.exports = db;