var mongoose = require('mongoose')

var projectUserSchema = mongoose.Schema({
    username: {type: String},
    password: String,
    firstName: String,
    lastName: String,
    userType: {type: String,
        default: 'Student',
        enum: ['curator', 'student', 'admin']},
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"}],
    email: String,
    phone: String,
    content: [{type: mongoose.Schema.Types.ObjectId, ref: "ContentModel"}],
    curriculum: [{type: mongoose.Schema.Types.ObjectId, ref: "CurriculumModel"}],
    dateCreated : {type: Date, default: Date.now()}
}, {collection: "projectUser"});

module.exports = projectUserSchema;