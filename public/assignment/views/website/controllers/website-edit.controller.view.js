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
            model.website = response;
        }

        function websiteError(response) {
            model.error = "Website not found."
        }

        function renderWebsites(response) {
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
                .deleteWebsite(model.userId, websiteId)
                .then(function (status) {
                    $location.url('/user/'+model.userId+'/website');
                });
        }

    }
})();