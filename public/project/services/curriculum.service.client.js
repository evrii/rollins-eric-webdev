(function () {
    angular
        .module('LEARN')
        .factory('curriculumService', curriculumService)

    function curriculumService($http) {

        var api = {
            createCurriculum: createCurriculum,
            findCurriculumById: findCurriculumById,
            updateCurriculum: updateCurriculum,
            deleteCurriculum: deleteCurriculum,
            findAllCurriculum: findAllCurriculum,
            addContentToCurriculum: addContentToCurriculum
        }
        return api;
        
        function createCurriculum(curriculum) {
            var url = "/api/project/curriculum";
            return $http
                .post(url, curriculum)
                .then(function (response) {
                    return response.data;
                });
        }

        function findCurriculumById(curriculumId) {
            var url = '/api/project/curriculum/'+curriculumId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findCurriculumByCredentials(curriculumname, password){
            var url = "/api/project/curriculum?curriculumname="+curriculumname+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data
                },function (response) {
                    return null;
                });
        }

        function findCurriculumByCurriculumname(curriculumname){
            var url = "/api/project/curriculum?curriculumname="+curriculumname;
            return $http.get(url)
                .then(function (response) {
                    return response.data
                });
        }

        function updateCurriculum(curriculumId, curriculum){
            var url = "/api/project/curriculum/"+curriculumId;
            return $http.put(url, curriculum)
                .then(function(response){
                    return response.data;
                })
        }

        function deleteCurriculum(curriculumId){
            var url = "/api/project/curriculum/"+curriculumId;
            return $http.delete(url)
                .then(function(){

                })
        }

        function findAllCurriculumTypes(){
            var url = "/api/project/curriculum/types";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllCurriculums(){
            var url = '/api/project/curriculum';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function addFriend(curriculumId,friendId){
            var url = "/api/project/curriculum/"+curriculumId+"/friend/"+friendId;
            return $http.put(url)
                .then(function(response){
                    return response.data;
                })
        }
        
        function addCourseToCurriculum(curriculumId, courseId) {
            var url = '/api/project/curriculum/'+curriculumId+'/course/'+courseId;
            //Fix this to be a put
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

    }
})();