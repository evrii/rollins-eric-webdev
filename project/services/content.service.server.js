const app = require('../../express');
var contentModel = require('../models/content/content.model.server');
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/project/uploads' });

var results = []

app.post('/api/project/user/:userId/content', addContentToUser);
app.get('/api/project/user/:userId/content', findAllContentForUser);

function addContentToUser(req, res) {
    var content = req.body;
    var userId = req.params['userId'];
    contentModel
        .createContentForUser(userId, content)
        .then(function (website) {
            res.json(website);
        }, function (response) {
            var t = 7;
        });
}

function findAllContentForUser(req, res) {
    var userId = req.params['userId'];
    contentModel
        .findAllContentForUser(userId)
        .then(function (content) {
            res.json(content);
        }, function (content) {
            var t = 6;
        });
}