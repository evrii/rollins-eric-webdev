const app = require('../../express');
var pageModel = require('../models/page/page.model.server');
var results = [];

var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
]

app.post('/api/assignment/website/:websiteId/page', createPage);
app.get('/api/assignment/website/:websiteId/page', findAllPagesForWebsite);
app.get('/api/assignment/page/:pageId', findPageById);
app.put('/api/assignment/page/:pageId', updatePage);
app.delete('/api/assignment/website/:websiteId/page/:pageId', deletePage);

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            res.json(pages);
        });
}

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params['websiteId'];
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        });
}

function deletePage(req, res) {
    var pageId = req.params['pageId'];
    var websiteId = req.params['websiteId'];

    pageModel
        .deletePage(websiteId, pageId)
        .then(function (status) {
            res.json(status);
        });
}

function findPageById(req, res) {
    var pageId = req.params['pageId'];

    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        });
}

function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params['pageId'];

    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.json(status);
        });
}