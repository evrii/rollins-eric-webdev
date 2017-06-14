var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    userType : {type: String, default: "STUDENT"},
    content: [{type: mongoose.Schema.Types.ObjectId, ref: "ContentModel"}],
}, {collection: "user"});

module.exports = userSchema;