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
projectUserModel.addContent = addContent;
projectUserModel.addCurriculum = addCurriculum;
projectUserModel.deleteWebsite = deleteWebsite;
projectUserModel.findUserByFacebookId = findUserByFacebookId;

module.exports = projectUserModel;

function createUser(user) {
    if(user.roles){
        user.roles = user.roles.split(',');
    }
    else{
        user.roles = ['STUDENT'];
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

function addContent(userId, contentId) {
    projectUserModel
        .findById(userId)
        .then(function (user) {
                user.content.push(contentId)
                return user.save();
            },
            function (response) {
                var y = 8;
                return y;
            });

}

function addCurriculum(userId, curriculumId) {
    projectUserModel
        .findById(userId)
        .then(function (user) {
                user.curriculum.push(curriculumId)
                return user.save();
            },
            function (response) {
                var y = 8;
                return y;
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