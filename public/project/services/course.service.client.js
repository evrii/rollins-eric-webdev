(function () {
    angular
        .module('LEARN')
        .service('courseService', courseService)

    function courseService ($http) {
        
        var urlBase = "http://data.oeconsortium.org/api/v1/courses/search/?q=SEARCH_TERM";

        var detailBaseUrl = "http://data.oeconsortium.org/api/v1/courses/view/COURSE_ID/"

        this.searchCourses = searchCourses;
        this.getCourseDetails = getCourseDetails;
        this.addCourseToUser = addCourseToUser;

        function searchCourses(searchTerm) {
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

        function addCourseToUser(course, userId){
            //May have to change url
            var url = "/api/project/content/"+course.id+"/user/"+userId;
            var courseObj = {
                searchKey: course.id
            }
            return $http
                .post(url, courseObj)
                .then(function (response) {
                    return response.data;
                }, function(response){
                    var t =8;
                });
        }

    }
})();