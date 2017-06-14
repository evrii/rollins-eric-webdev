(function () {
    angular
        .module('LEARN')
        .service('openEducationService', openEducationService)

    function openEducationService ($http) {
        
        var urlBase = "http://data.oeconsortium.org/api/v1/courses/search/?q=SEARCH_TERM";

        var detailBaseUrl = "http://data.oeconsortium.org/api/v1/courses/view/COURSE_ID/"

        this.searchContent = searchContent;
        this.getCourseDetails = getCourseDetails;

        function searchContent(searchTerm) {
            var url = urlBase
                .replace("SEARCH_TERM", searchTerm)
                .replace(" ", "+");
            return $http.get(url);
        }
        
        function getCourseDetails(courseId) {
            var url = detailBaseUrl
                .replace("COURSE_ID", courseId)
            return $http.get(url);
        }

    }
})();