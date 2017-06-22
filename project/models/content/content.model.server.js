var mongoose = require('mongoose');
var contentSchema = require('./content.schema.server');
var contentModel = mongoose.model('ContentModel', contentSchema);
var userModel = require('../projectUser/projectUser.model.server');

contentModel.createContentForUser = createContentForUser;
contentModel.findAllContentForUser = findAllContentForUser;
contentModel.findConentById = findConentById;
contentModel.updateConent = updateConent;
contentModel.deleteConent = deleteConent;

module.exports = contentModel;

function createContentForUser(userId, content) {
    //Check to see if course already exists
    // contentModel
    //     .findConentById(content._id)

    return contentModel.create(content)
        .then(function (content) {
            userModel
                .addContent(userId, content._id)
        }, function(response){
            var t = 8;
        });
}

function findConentById(contentId){
    return contentModel.findById(contentId);
}

function updateConent(contentId, newConent) {
    return contentModel.update({_id: contentId}, {$set: newConent})
}

function deleteConent(userId, contentId) {
    return contentModel
        .remove({_id: contentId})
        .then(function (content) {
            return userModel
                .deleteConent(userId, contentId);
        })
}

function findAllContentForUser(userId){
    return userModel
        .findUserById(userId)
        .populate('content')
        .exec();
}
