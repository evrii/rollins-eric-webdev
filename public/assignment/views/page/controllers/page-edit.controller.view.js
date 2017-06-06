(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController)

    function pageEditController($routeParams,
                                $location,
                                pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.deletePage = deletePage;
        model.updatePage = updatePage;

        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(renderPages, pagesError);
            pageService
                .findPageById(model.pageId)
                .then(renderPage, pageError);
        }
        init();

        function renderPage(response) {
            model.page = response;
        }

        function pageError(response) {
            model.error = "Page not found."
        }

        function renderPages(response) {
            model.pages = response;
        }

        function pagesError(response) {
            model.error = "Page list not found."
        }

        function updatePage(page) {
            pageService
                .updatePage(page._id, page)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+"/page");
                })
        }

        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }

    }
})();