const app = require('../../express');
var contentModel = require('../models/content/content.model.server');
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/project/uploads' });

var results = []

app.post('/api/project/user/:userId/content', addContentToUser);
app.get('/api/project/user/:userId/content', findAllContentForUser);
app.post('/api/project/curriculum/:curriculumId/content', addContentToCurriculum);
app.get('/api/project/curriculum/:curriculumId/content', findAllContentForCurriculum);

function addContentToUser(req, res) {
    var content = req.body;
    var userId = req.params['userId'];
    contentModel
        .createContentForUser(userId, content)
        .then(function (content) {
            res.json(content);
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

function addContentToCurriculum(req, res) {
    var content = req.body;
    var curriculumId = req.params['curriculumId'];
    contentModel
        .createContentForCurriculum(curriculumId, content)
        .then(function (content) {
            res.json(content);
        }, function (response) {
            var t = 7;
        });
}

function findAllContentForCurriculum(req, res) {
    var curriculumId = req.params['curriculumId'];
    contentModel
        .findAllContentForCurriculum(curriculumId)
        .then(function (contentList) {
            res.json(contentList);
        }, function (response) {
            var t = 6;
        });
}