(function () {
    angular
        .module('LEARN')
        .controller('ContentSearchController', ContentSearchController)

    function ContentSearchController ($routeParams,
                                      $sce,
                                      $location,
                                      openEducationService) {
        var model = this;

        model.searchContent = searchContent;
        // model.selectPhoto = selectPhoto;
        //
        // function selectPhoto(photo) {
        //     var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
        //     url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
        //     widgetService
        //         .updateWidgetUrl(model.widgetId, url)
        //         .then(function () {
        //             $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+model.widgetId);
        //         })
        // }

        function searchContent(searchTerm) {
            console.log(searchTerm);
            openEducationService
                .searchContent(searchTerm)
                .then(function (response) {
                    console.log(response.data)
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;

                });
        }
    }
})();