var mongoose = require('mongoose');
var projectUserSchema = require('./projectUser.schema.server');
var projectUserModel = mongoose.model('ProjectUserModel', projectUserSchema);

projectUserModel.createUser = createUser;
projectUserModel.findUserById = findUserById;
projectUserModel.findAllUsers = findAllUsers;
projectUserModel.findUserByUsername = findUserByUsername;
projectUserModel.findUserByCredentials = findUserByCredentials;
projectUserModel.updateUser = updateUser;
projectUserModel.deleteUser = deleteUser;
projectUserModel.addWebsite = addWebsite;
projectUserModel.deleteWebsite = deleteWebsite;
projectUserModel.findUserByFacebookId = findUserByFacebookId;

module.exports = projectUserModel;

function createUser(user) {
    if(user.roles){
        user.roles = user.roles.split(',');
    }
    else{
        user.roles = ['USER'];
    }

    return projectUserModel.create(user)
}

function findUserById(userId){
    return projectUserModel.findById(userId);
}

function findAllUsers() {
    return projectUserModel.find();
}

function findUserByUsername(username) {
    return projectUserModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return projectUserModel.findOne({username: username, password: password});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    if(typeof user.roles === 'string'){
        user.roles = user.roles.split(',');
    }
    return projectUserModel.update({_id: userId}, {$set: newUser})
}

function deleteUser(userId) {
    return projectUserModel.remove({_id: userId})
}

function addWebsite(userId, websiteId) {
    projectUserModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function deleteWebsite(userId, websiteId) {
    projectUserModel
        .findById(userId)
        .then(function (user) {
            var index =  user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

function findUserByFacebookId(facebookId) {
    return projectUserModel
        .findOne({'facebook.id':facebookId});
}