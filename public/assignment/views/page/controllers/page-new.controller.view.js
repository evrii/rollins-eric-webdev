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
            model.pages = pageService.findAllPagesForWebsite(model.websiteId);
        }
        init();

        function createPage(page) {
            //Look into this
            page.userId = model.userId;
            page.websiteId = model.websiteId;
            pageService
                .createPage(page, model.websiteId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }

    }
})();