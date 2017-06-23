(function () {
    angular
        .module('LEARN')
        .controller('curriculumEditController', curriculumEditController)

    function curriculumEditController($routeParams,
                                   $location,
                                   currentUser,
                                   curriculumService) {
        var model = this;
        // model.createCurriculum = createCurriculum;

        function init() {
            model.userId = currentUser._id;
            model.curriculumId = $routeParams['curriculumId'];
            curriculumService
                .findCurriculumById(model.curriculumId)
                .then(renderCurriculum);
            curriculumService
                .findAllCurriculumForUser(model.userId)
                .then(renderCurriculumList);
            curriculumService
                .findAllContentForCurriculum(model.curriculumId)
                .then(renderContentList);

        }
        init();

        function renderCurriculumList(curriculumList) {
            model.curriculumList = curriculumList;
        }

        function renderContentList(contentList) {
            model.contentList = contentList;
        }

        function renderCurriculum(curriculum) {
            model.curriculum = curriculum;
        }


    }
})();