var mongoose = require('mongoose')

var projectUserSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    roles: [{type: String,
        default: 'STUDENT',
        enum: ['FACULTY', 'STUDENT', 'ADMIN']}],
    // google: {
    //     id: String,
    //     token: String
    // },
    email: String,
    phone: String,
    content: [{type: mongoose.Schema.Types.ObjectId, ref: "ContentModel"}],
    dateCreated : {type: Date, default: Date.now()}
}, {collection: "projectUser"});

module.exports = projectUserSchema;