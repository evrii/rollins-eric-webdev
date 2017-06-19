var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

userModel.findAllUserTypes = findAllUserTypes;
userModel.findAllUsers = findAllUsers;

userModel.addContent = addContent;
//userModel.removeContent = removeContent;

userModel.addFriend = addFriend;
//userModel.removeFriend = removeFriend;

module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    return userModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function findAllUserTypes() {
    //SHOULD THIS GO INTO A TABLE?
    return ["TEACHER", "STUDENT", "ADMIN"];
}

function findAllUsers() {
    return userModel.find();
}

function addContent(userId, contentId) {
    userModel
        .findById(userId)
        .then(function (user) {
            //ADD A CHECK TO SEE IF THE USER ALREADY
            //HAS THIS CONTENT
            user.content.push(contentId);
            return user.save();
        });
}

function addFriend(userId, friendId) {
    userModel
        .findById(userId)
        .then(function (user) {
            //ADD A CHECK TO SEE IF THE USER ALREADY
            //HAS THIS FRIEND
            user.friends.push(friendId);
            return user.save();
        });
}
