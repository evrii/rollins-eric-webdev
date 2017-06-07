(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController)

    function pageListController($routeParams,
                                pageService) {
        var model = this;

        function init() {
            model.userId = $routeParams['userId'];
            model.websiteId = $routeParams['websiteId'];
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(renderPages)
        }
        init();

        function renderPages (pages) {
            model.pages = pages
        }


    }
})();