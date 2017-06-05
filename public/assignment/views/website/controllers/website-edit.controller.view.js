(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController)

    function websiteEditController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites, websitesError);

            websiteService
                .findWebsiteById(model.websiteId)
                .then(renderWebsite, websiteError);
        }
        init();

        function renderWebsite(response) {
            console.log("RENDER WEBSITE: "+response);
            model.website = response;
        }

        function websiteError(response) {
            model.error = "Website not found."
        }

        function renderWebsites(response) {
            console.log("RENDER WEBSITES: "+response);
            model.websites = response;
        }

        function websitesError(response) {
            model.error = "Websites not found."
        }

        function updateWebsite(website) {
            websiteService
                .updateWebsite(website._id, website)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website');
                })

        }

        function deleteWebsite(websiteId) {
            websiteService
                .deleteWebsite(websiteId);
            $location.url('/user/'+model.userId+'/website');
        }

    }
})();