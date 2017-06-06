(function () {
    angular
        .module('WAM')
        .service('pageService', pageService)

    function pageService($http) {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ]

        var api = {
            createPage: createPage,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage,
            findAllPagesForWebsite: findAllPagesForWebsite
        }
        return api;

        function findAllPagesForWebsite(websiteId){
            var url = "/api/assignment/website/"+websiteId+"/page";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createPage(page, websiteId) {
            var url = "/api/assignment/website/"+websiteId+"/page";
            return $http
                .post(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(pageId) {
            var url = "/api/assignment/page/"+pageId;
            return $http.delete(url)
                .then(function(response){
                    return response.data;
                });
        }

        function findPageById(pageId) {
            var url = "/api/assignment/page/"+pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePage(pageId, page){
            var url = "/api/assignment/page/"+pageId;
            return $http.put(url, page)
                .then(function(response){
                    return response.data;
                });
        }
    }
})();