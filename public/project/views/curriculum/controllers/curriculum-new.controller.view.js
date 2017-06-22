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
        }
        init();

        function createCurriculum(curriculum) {
            if(curriculum && curriculum.name)
            {
                curriculum.developerId = model.userId;
                curriculumService
                    .createCurriculumForCurator(curriculum, model.userId)
                    .then(function (response) {
                        $location.url('/profile');
                    }, function(response){
                        var t = 4;
                    });
            }

        }

    }
})();