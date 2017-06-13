var app = require('../../express');
var websiteModel = require('../models/website/website.model.server');

app.post('/api/assignment/user/:userId/website', createWebsiteForUser);
app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
app.get('/api/assignment/website/:websiteId', findWebsiteById);
app.put('/api/assignment/website/:websiteId', updateWebsite);
app.delete('/api/assignment/user/:userId/website/:websiteId', deleteWebsiteFromUser);


function createWebsiteForUser(req, res) {
    var website = req.body;
    var userId = req.params['userId'];
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website);
        });
}

function findAllWebsitesForUser(req, res) {
    var userId = req.params['userId'];
    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
            res.json(websites);
        });
}

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];

    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
        });
}

function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params['websiteId'];

    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.json(status);
        });
}

function deleteWebsiteFromUser(req, res) {
    var websiteId = req.params['websiteId'];
    var userId = req.params['userId'];

    websiteModel
        .deleteWebsite(userId, websiteId)
        .then(function (status) {
            res.json(status);
        });
}

