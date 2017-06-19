(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController)

    function websiteNewController($routeParams,
                                   $location,
                                   currentUser,
                                   websiteService) {
        var model = this;
        model.createWebsite = createWebsite;

        function init() {
            model.userId = currentUser._id;
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites, websitesError);
        }
        init();

        function createWebsite(website) {
            if(website && website.name)
            {
                website.developerId = model.userId;
                websiteService
                    .createWebsiteForUser(model.userId, website)
                    .then(function (response) {
                        $location.url('/website');
                    }, websitesError);
            }

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