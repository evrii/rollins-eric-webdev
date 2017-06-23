(function () {
    angular
        .module('LEARN')
        .controller('CourseSearchController', CourseSearchController)

    function CourseSearchController ($routeParams,
                                     $sce,
                                     $location,
                                     currentUser,
                                     courseService,
                                     userService) {
        var model = this;

        model.searchCourses = searchCourses;
        model.getCourseDetails = getCourseDetails;
        model.addCourseToUser =addCourseToUser;

        function init() {
            model.userId = currentUser._id;
            model.curriculumId = $routeParams['curriculumId'];
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

        function addCourseToUser(course, userId) {
            courseService
                .addCourseToUser(course, userId)
                .then(function (response) {
                    $location.url('/profile');
                });
        }

    }
})();