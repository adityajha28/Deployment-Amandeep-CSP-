// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://amandeeprewani21:gwkX858P5alUkgte@cluster0.dahsegz.mongodb.net/CSP?retryWrites=true&w=majority&appName=Cluster0');

module.exports = mongoose.connection;
// Aditya28012002