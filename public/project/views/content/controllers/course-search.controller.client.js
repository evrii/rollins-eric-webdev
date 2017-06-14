(function () {
    angular
        .module('LEARN')
        .controller('ContentSearchController', ContentSearchController)

    function ContentSearchController ($routeParams,
                                      $sce,
                                      $location,
                                      openEducationService,
                                      userService) {
        var model = this;

        model.searchContent = searchContent;
        model.getCourseDetails = getCourseDetails;
        model.addCourseToUser =addCourseToUser;

        function init() {
            model.userId = $routeParams['userId'];
        }
        init();

        function searchContent(searchTerm) {
            openEducationService
                .searchContent(searchTerm)
                .then(function (response) {
                    console.log(response)
                    model.courses = response.data.documents;

                });
        }

        function getCourseDetails(courseId) {
            openEducationService
                .getCourseDetails(courseId)
                .then(function (response) {
                console.log(response)
                model.selectedCourse = response.data;
            });

        }

        function addCourseToUser(userId, courseId) {
            userService
                .addCourseToUser(userId, courseId)
                .then(function (response) {
                    $location.url('/user/'+model.userId);
                });
        }

    }
})();