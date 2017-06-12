(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController)

    function websiteNewController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;
        model.createWebsite = createWebsite;

        function init() {
            model.userId = $routeParams['userId'];
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites, websitesError);
        }
        init();

        function createWebsite(website) {
            website.developerId = model.userId;
            websiteService
                .createWebsiteForUser(model.userId, website)
                .then(function (response) {
                    $location.url('/user/'+model.userId+'/website');
                })

        }
        function renderWebsites(response) {
            console.log("RENDER WEBSITES: "+response);
            model.websites = response;
        }

        function websitesError(response) {
            model.error = "Websites not found."
        }

    }
})();