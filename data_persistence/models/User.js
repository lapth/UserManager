var mongoose = require('mongoose');
var user = new mongoose.Schema({
    _id: "string",
    hoTen: "string",
    tel: "string",
    quyen: "number"
}, {collection: "user"});

module.exports = mongoose.model('user', user);