var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
var userModel = require('../user/user.model.server');

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.findAllWebsites = findAllWebsites;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsiteFromUser = deleteWebsiteFromUser;

module.exports = websiteModel;

function createWebsiteForUser(userId, website) {
    website._user = userId;
    return websiteModel.create(website)
        .then(function (website) {
            userModel
                .addWebsite(userId, website._id)
        });
}

function findWebsiteById(websiteId){
    return websiteModel.findById(websiteId);
}

function findAllWebsitesForUser(userId){
    return websiteModel
        .find({_user: userId})
        .populate('_user')
        .exec();
}

function findAllWebsites() {
    return websiteModel.find();
}

function updateWebsite(websiteId, newWebsite) {
    return websiteModel.update({_id: websiteId}, {$set: newWebsite})
}

function deleteWebsiteFromUser(userId, websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (website) {
            return userModel
                .removeWebsite(website.userId,);
        })

}