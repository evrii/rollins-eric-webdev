(function () {
    angular
        .module('WAM')
        .service('widgetService', widgetService)

    function widgetService($http) {

        var api = {
            findAllWidgetsForPage: findAllWidgetsForPage,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            updateWidgetUrl: updateWidgetUrl,
            createWidget: createWidget,
            deleteWidget: deleteWidget,
            reorderWidget: reorderWidget
        }
        return api;

        function findAllWidgetsForPage(pageId){
            var url = "/api/assignment/page/"+pageId+"/widget";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createWidget(widget, pageId) {
            var url = "/api/assignment/page/"+pageId+"/widget";
            return $http
                .post(url, widget)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    var dog = 888;
                });
        }

        function deleteWidget(pageId, widgetId) {
            var url = "/api/assignment/page/"+pageId+"/widget/"+widgetId;
            return $http.delete(url)
                .then(function(response){
                    return response.data;
                });
        }

        function findWidgetById(widgetId) {
            var url = "/api/assignment/widget/"+widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget(widgetId, widget){
            var url = "/api/assignment/widget/"+widgetId;
            return $http.put(url, widget)
                .then(function(response){
                    return response.data;
                })
        }

        function updateWidgetUrl(widgetId, imageUrl){
            var serviceUrl = "/api/assignment/widget/"+widgetId;
            return $http.get(serviceUrl)
                .then(function (response) {
                    return response.data;
                })
                .then(function (response) {
                    widget = response;
                    widget.url = imageUrl;
                    $http.put(serviceUrl, widget)
                        .then(function (response) {
                            return response.data;
                        });
                })
        }

        function reorderWidget(pageId, initialIndex, finalIndex){
            if(initialIndex != finalIndex) {
                var url = "/api/assignment/page/" + pageId + "/widget/?initial=" + initialIndex + "+&final=" + finalIndex;
                return $http.put(url)
                    .then(function (response) {
                        return response.data;
                    })
            }
        }
    }
})();