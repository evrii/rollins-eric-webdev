var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);
var websiteModel = require('../website/website.model.server');

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel.create(page)
        .then(function (page) {
            websiteModel
                .addPage(websiteId, page._id)
        });
}

function findPageById(pageId){
    return pageModel.findById(pageId);
}

function findAllPagesForWebsite(websiteId){
    return pageModel
        .find({_website: websiteId})
        .populate('_website')
        .exec();
}

function updatePage(pageId, newPage) {
    return pageModel.update({_id: pageId}, {$set: newPage})
}

function deletePage(websiteId, pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (page) {
            return websiteModel
                .deletePage(websiteId, pageId);
        });

}