(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController)

    function websiteListController($routeParams,
                                   currentUser,
                                   websiteService) {
        var model = this;



        function init() {
            model.userId = currentUser._id;
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);
        }
        init();

        function renderWebsites (websites) {
            model.websites = websites
        }
    }
})();