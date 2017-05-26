(function () {
    angular
        .module('WAM')
        .service('websiteService', websiteService)

    function websiteService() {
        this.findAllWebsitesForUser = findAllWebsitesForUser();

    }
})();