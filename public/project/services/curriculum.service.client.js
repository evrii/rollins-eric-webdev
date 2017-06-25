(function () {
    angular
        .module('LEARN')
        .factory('curriculumService', curriculumService)

    function curriculumService($http) {

        var api = {
            createCurriculumForCurator: createCurriculumForCurator,
            findAllCurriculumForUser: findAllCurriculumForUser,
            findCurriculumById: findCurriculumById,
            findAllContentForCurriculum: findAllContentForCurriculum,
            findAllCurriculum: findAllCurriculum,
            deleteCurriculum: deleteCurriculum,
            updateCurriculum: updateCurriculum
        }
        return api;
        
        function createCurriculumForCurator(curriculum, userId) {
            var url = "/api/project/user/"+userId+"/curriculum";
            return $http
                .post(url, curriculum)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllCurriculumForUser(userId){
            var url = "/api/project/user/"+userId+"/curriculum";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data.curriculum;
                });
        }
        
        function findCurriculumById(curriculumId) {
            var url = "/api/project/curriculum/"+curriculumId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findAllContentForCurriculum(curriculumId) {
            var url = "/api/project/curriculum/"+curriculumId+"/content";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data.content;
                });
        }
        
        function findAllCurriculum() {
            var url = "/api/project/curriculum";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function deleteCurriculum(curriculumId) {
            var url = "/api/project/curriculum/"+curriculumId;
            return $http
                .delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateCurriculum(newCurriculum) {
            var url = "/api/project/curriculum/"+newCurriculum._id;
            return $http
                .put(url, newCurriculum)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();