(function () {
    angular
        .module('LEARN')
        .service('contentService', contentService)

    function contentService ($http) {

        this.findAllContentForUser = findAllContentForUser;

        function findAllContentForUser(userId){
            var url = "/api/project/user/"+userId+"/content";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data.content;
                });
        }

    }
})();