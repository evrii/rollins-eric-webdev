(function () {
    angular
        .module('LEARN')
        .factory('curriculumService', curriculumService)

    function curriculumService($http) {

        var api = {
            createCurriculumForCurator: createCurriculumForCurator,
            findAllCurriculumForUser: findAllCurriculumForUser,
            findCurriculumById: findCurriculumById
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
            var url = "/api/project/curriculum"+curriculumId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data.curriculum;
                });
        }

    }
})();