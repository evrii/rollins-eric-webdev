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
                .findAllCurriculumForUser(model.userId)
                .then(renderCurriculumList);
            curriculumService
                .findCurriculumById(model.curriculumId)
                .then(renderCurriculum);
        }
        init();

        function renderCurriculumList(curriculumList) {
            model.curriculumList = curriculumList;
        }

        function renderCurriculum(curriculum) {
            model.curriculum = curriculum;
        }


    }
})();