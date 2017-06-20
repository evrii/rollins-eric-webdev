(function () {
    angular
        .module('LEARN')
        .controller('curriculumNewController', curriculumNewController)

    function curriculumNewController($routeParams,
                                   $location,
                                   currentUser,
                                   curriculumService) {
        var model = this;
        model.createCurriculum = createCurriculum;

        function init() {
            model.userId = currentUser._id;
            curriculumService
                .findAllCurriculumForCurator(model.userId)
                .then(renderCurriculum, curriculumError);
        }
        init();

        function createCurriculum() {
            if(curriculum && curriculum.name)
            {
                curriculum.developerId = model.userId;
                curriculumService
                    .createCurriculumForCurator(model.userId, curriculum)
                    .then(function (response) {
                        $location.url('/curriculum');
                    }, curriculumError);
            }

        }
        function renderCurriculum(response) {
            console.log("RENDER WEBSITES: "+response);
            model.curriculum = response;
        }

        function curriculumError(response) {
            model.error = "Curriculum not found."
        }

    }
})();