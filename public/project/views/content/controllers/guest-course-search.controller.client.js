(function () {
    angular
        .module('LEARN')
        .controller('GuestCourseSearchController', GuestCourseSearchController)

    function GuestCourseSearchController ($routeParams,
                                     $sce,
                                     $location,
                                     courseService,
                                     userService) {
        var model = this;

        model.searchCourses = searchCourses;
        model.getCourseDetails = getCourseDetails;

        function init() {
            model.guest = true;
        }
        init();

        function searchCourses(searchTerm) {
            courseService
                .searchCourses(searchTerm)
                .then(function (response) {
                    console.log(response)
                    model.courses = response.data.documents;

                });
        }

        function getCourseDetails(courseId) {
            courseServive
                .getCourseDetails(courseId)
                .then(function (response) {
                console.log(response)
                model.selectedCourse = response.data;
            });
        }

    }
})();