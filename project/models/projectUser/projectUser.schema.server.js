var mongoose = require('mongoose')

var projectUserSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    roles: [{type: String,
        default: 'USER',
        enum: ['USER', 'FACULTY', 'STUDENT', 'ADMIN']}],
    facebook: {
        id: String,
        token: String
    },
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    dateCreated : {type: Date, default: Date.now()}
}, {collection: "projectUser"});

module.exports = projectUserSchema;