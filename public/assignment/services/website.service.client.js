(function () {
    angular
        .module('WAM')
        .service('websiteService', websiteService)

    function websiteService($http) {

        var api = {
            createWebsite: createWebsite,
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

        function createWebsite(website) {
            var url = "/api/assignment/user/"+website.developerId+"/website";
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

        function deleteWebsite(websiteId) {
            var url = "/api/assignment/website/"+websiteId;
            return $http.delete(url)
                .then(function(){

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