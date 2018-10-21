var mongoose = require('mongoose');
var user = new mongoose.Schema({
    _id: "string",          //_id: record id
    userId: "string",       // UserId is unique key
    password: "string",
    firstName: "string",
    lastName: "string",
    group: "string"       // Which group this user belong to
}, {collection: "user"});

module.exports = mongoose.model('user', user);