(function () {
    angular
        .module('LEARN')
        .controller('ContentSearchController', ContentSearchController)

    function ContentSearchController ($routeParams,
                                      $sce,
                                      $location,
                                      openEducationService) {
        var model = this;

        model.searchContent = searchContent;
        model.getCourseDetails = getCourseDetails;

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

    }
})();