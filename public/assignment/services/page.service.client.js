(function () {
    angular
        .module('WAM')
        .service('pageService', pageService)

    function pageService() {
        this.findAllPagesForWebsite = findAllPagesForWebsite;
        this.findPageById = findPageById;
        this.createPage = createPage;
        this.deletePage = deletePage;

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ]

        function findAllPagesForWebsite(websiteId){
            var results = [];

            for (var v in pages){
                if(pages[v].websiteId === websiteId){
                    pages[v].created = new Date();
                    pages[v].accessed = new Date();
                    results.push(pages[v]);
                }
            }

            return results;
        }

        function createPage(page) {
            page._id = (new Date()).getTime() + "";
            pages.push(page);
        }

        function deletePage(websiteId) {
            var page = findPageById(websiteId);
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }

        function findPageById(pageId) {
            return pages.find(function (page) {
                return page._id === pageId
            });
        }
    }
})();