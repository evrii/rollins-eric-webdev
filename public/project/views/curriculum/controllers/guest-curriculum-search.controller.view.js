(function () {
    angular
        .module('LEARN')
        .controller('guestCurriculumSearchController', guestCurriculumSearchController)

    function guestCurriculumSearchController($routeParams,
                                   $location,
                                   curriculumService,
                                   userService) {
        var model = this;

        function init() {
            model.guest = true;
            curriculumService
                .findAllCurriculum()
                .then(renderCurriculumList)
        }
        init();

        function renderCurriculumList(response) {
            model.curriculumList = response;
        }

    }
})();