var mongoose = require('mongoose');
var curriculumSchema = require('./curriculum.schema.server');
var curriculumModel = mongoose.model('CurriculumModel', curriculumSchema);
var userModel = require('../projectUser/projectUser.model.server');

curriculumModel.createCurriculumForCurator = createCurriculumForCurator;
curriculumModel.findAllCurriculumForUser = findAllCurriculumForUser;
curriculumModel.findCurriculumById = findCurriculumById;
curriculumModel.addContent = addContent;


module.exports = curriculumModel;

function createCurriculumForCurator(userId, curriculum) {
    //Check to see if  already exists
    // curriculumModel
    //     .findConentById(curriculum._id)

    return curriculumModel.create(curriculum)
        .then(function (curriculum) {
            userModel
                .addCurriculum(userId, curriculum._id)
        }, function(response){
            var t = 8;
        });
}

function findAllCurriculumForUser(userId){
    return userModel
        .findUserById(userId)
        .populate('curriculum')
        .exec();
}

function findCurriculumById(curriculumId) {
    return curriculumModel.findById(curriculumId);
}

function addContent(curriculumId, contentId) {
    curriculumModel
        .findById(curriculumId)
        .then(function (curriculum) {
                curriculum.content.push(contentId)
                return curriculum.save();
            },
            function (response) {
                var y = 8;
                return y;
            });
}