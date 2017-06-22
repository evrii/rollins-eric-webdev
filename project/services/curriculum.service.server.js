var app = require('../../express');
var curriculumModel = require('../models/curriculum/curriculum.model.server');

const USER_TYPES = ["curator", "student", "admin"]

app.post('/api/project/user/:userId/curriculum', createCurriculumForCurator);
app.get('/api/project/user/:userId/curriculum', findAllCurriculumForUser);
app.get('/api/project/curriculum/:curriculumId', findCurriculumById);

function createCurriculumForCurator(req, res) {
    var curriculum = req.body;
    var userId = req.params['userId'];
    curriculumModel
        .createCurriculumForCurator(userId, curriculum)
        .then(function (curriculum) {
            res.json(curriculum);
        }, function (response) {
            var y = 7;
        });
}

function findAllCurriculumForUser(req, res) {
    var userId = req.params['userId'];
    curriculumModel
        .findAllCurriculumForUser(userId)
        .then(function (curriculum) {
            res.json(curriculum);
        }, function (response) {
            var t = 6;
        });
}

function findCurriculumById(req, res) {
    var curriculumId = req.params['curriculumId'];
    curriculumModel
        .findAllCurriculumForUser(userId)
        .then(function (curriculum) {
            res.json(curriculum);
        }, function (response) {
            var t = 6;
        });
}