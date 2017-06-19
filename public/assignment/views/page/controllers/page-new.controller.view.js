(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController)

    function pageNewController($routeParams,
                               $location,
                               pageService) {
        var model = this;
        model.createPage = createPage;

        function init() {
            model.userId = $routeParams['userId'];
            model.websiteId = $routeParams['websiteId'];
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(renderPages, pagesError);
        }
        init();

        function renderPages(response) {
            model.pages = response;
        }

        function pagesError(response) {
            model.error = "Page list not found."
        }

        function createPage(page) {
            if(page && page.name) {
                page.userId = model.userId;
                page.websiteId = model.websiteId;
                pageService
                    .createPage(page, model.websiteId)
                    .then(function (response) {
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                    })
            }
        }

    }
})();