var mongoose = require('mongoose');
var contentSchema = require('./content.schema.server');
var contentModel = mongoose.model('ConentModel', contentSchema);
var userModel = require('../projectUser/projectUser.model.server');

contentModel.createContentForUser = createContentForUser;
contentModel.findConentById = findConentById;
contentModel.findAllConents = findAllConents;
contentModel.updateConent = updateConent;
contentModel.deleteConent = deleteConent;
contentModel.addPage = addPage;
contentModel.deletePage = deletePage;

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

function findAllConents() {
    return contentModel.find();
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

function addPage(contentId, pageId) {
    contentModel
        .findById(contentId)
        .then(function (content) {
            content.pages.push(pageId);
            return content.save();
        });
}

function deletePage(contentId, pageId) {
    contentModel
        .findById(contentId)
        .then(function (content) {
            var index =  content.pages.indexOf(pageId);
            content.pages.splice(index, 1);
            return content.save();
        },function () {

        });
}