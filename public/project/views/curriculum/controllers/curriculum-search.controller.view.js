(function () {
    angular
        .module('LEARN')
        .controller('curriculumSearchController', curriculumSearchController)

    function curriculumSearchController($routeParams,
                                   $location,
                                   currentUser,
                                   curriculumService,
                                   userService) {
        var model = this;
        model.addCurriculumToUser = addCurriculumToUser;

        function init() {
            model.userId = currentUser._id;
            model.user = currentUser;
            curriculumService
                .findAllCurriculum()
                .then(renderCurriculumList)
            // curriculumService
            //     .findAllCurriculumForUser(model.userId)
            //     .then(renderCurriculumList);
        }
        init();

        function addCurriculumToUser(curriculumId, userId) {
            userService
                .addCurriculumToUser(curriculumId, userId)
                .then(function (response) {
                    $location.url('/profile');
                }, function(response){
                    var t = 4;
                });

        }

        function renderCurriculumList(response) {
            model.curriculumList = response;
        }



    }
})();