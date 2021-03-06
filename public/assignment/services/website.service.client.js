(function () {
    angular
        .module('WAM')
        .service('websiteService', websiteService)

    function websiteService($http) {

        var api = {
            createWebsiteForUser: createWebsiteForUser,
            findWebsiteById: findWebsiteById,
            findAllWebsitesForUser: findAllWebsitesForUser,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        }
        return api;

        function findAllWebsitesForUser(userId){
            var url = "/api/assignment/user/"+userId+"/website";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createWebsiteForUser(userId, website) {
            var url = "/api/assignment/user/"+userId+"/website";
            return $http
                .post(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWebsite(websiteId, website){
            var url = "/api/assignment/website/"+websiteId;
            return $http.put(url, website)
                .then(function(response){
                    return response.data;
                })
        }

        function deleteWebsite(userId, websiteId) {
            var url = "/api/assignment/user/"+userId+"/website/"+websiteId;
            return $http.delete(url,userId)
                .then(function(response){
                    return response.data;
                })
        }

        function findWebsiteById(websiteId) {
            var url = '/api/assignment/website/'+websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();