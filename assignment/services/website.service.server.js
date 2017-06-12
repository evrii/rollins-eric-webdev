var app = require('../../express');
var websiteModel = require('../models/website/website.model.server');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.post('/api/assignment/user/:userId/website', createWebsiteForUser);
app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
app.get('/api/assignment/website/:websiteId', findWebsiteById);
app.put('/api/assignment/website/:websiteId', updateWebsite);
app.delete('/api/assignment/website/:websiteId', deleteWebsiteFromUser);


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
        })
    // results = []
    // var userId = req.params['userId'];
    // console.log(websites)
    // for (var v in websites){
    //     if(websites[v].developerId === userId){
    //         websites[v].accessed = new Date();
    //         results.push(websites[v]);
    //     }
    // }
    //
    // res.json(results);
}

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    for(var w in websites) {
        if(websites[w]._id === websiteId){
            res.send(websites[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function updateWebsite(req, res) {
    var website = req.body;

    for(var w in websites) {
        if(websites[w]._id === req.params['websiteId']){
            websites[w] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
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

