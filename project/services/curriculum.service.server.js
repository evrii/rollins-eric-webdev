var app = require('../../express');
var curriculumModel = require('../models/curriculum/curriculum.model.server');

const USER_TYPES = ["curator", "student", "admin"]

app.post('/api/project/user/:userId/curriculum', createCurriculumForCurator);
app.get('/api/project/user/:userId/curriculum', findAllCurriculumForUser);
app.get('/api/project/curriculum/:curriculumId', findCurriculumById);
app.get('/api/project/curriculum', findAllCurriculum);
app.delete('/api/project/curriculum/:curriculumId', deleteCurriculum);
app.put('/api/project/curriculum/:curriculumId', updateCurriculum)

function createCurriculumForCurator(req, res) {
    var curriculum = req.body;
    var userId = req.params['userId'];
    curriculumModel
        .createCurriculumForCurator(userId, curriculum)
        .then(function (curriculum) {
            res.json(curriculum);
        }, function (response) {
            res.send({"msg":"Unable to add curriculum"})
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
        .findCurriculumById(curriculumId)
        .then(function (curriculum) {
            res.json(curriculum);
        }, function (response) {
            var t = 6;
        });
}

function findAllCurriculum(req, res) {
    curriculumModel
        .findAllCurriculum()
        .then(function (curriculumList) {
            res.json(curriculumList);
        }, function (response) {
            var t = 6;
        });
}

function deleteCurriculum(req, res) {
    var curriculumId = req.params['curriculumId'];
    curriculumModel
        .deleteCurriculum(curriculumId)
        .then(function (response) {
            res.json(response);
        }, function (response) {
            var t = 6;
        });
}

function updateCurriculum(req, res) {
    var curriculumId = req.params['curriculumId'];
    var newCurriculum = req.body;
    curriculumModel
        .updateCurriculum(curriculumId, newCurriculum)
        .then(function (curriculum) {
            res.json(curriculum);
        }, function (response) {
            res.send({"msg":"Unable to add curriculum"})
        });
}