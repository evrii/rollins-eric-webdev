(function () {
    angular
        .module('LEARN')
        .service('flickrService', flickrService)

    function flickrService($http) {

        var key = "feb996c6dadf0ad8068fb3bee2df851f";
        var secret = "a9311d4f5c62c2e6";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        this.searchPhotos = searchPhotos;

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();