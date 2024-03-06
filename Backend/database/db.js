// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/CSP');

module.exports = mongoose.connection;
