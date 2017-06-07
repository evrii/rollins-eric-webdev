(function () {
    angular
        .module('WAM')
        .service('websiteService', websiteService)

    function websiteService($http) {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

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