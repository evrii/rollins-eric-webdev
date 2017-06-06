(function () {
    angular
        .module('WAM')
        .service('widgetService', widgetService)

    function widgetService($http) {

        var api = {
            findAllWidgetsForPage: findAllWidgetsForPage,
            findWidgetById: findWidgetById,
            createWidget: createWidget,
            deleteWidget: deleteWidget
        }
        return api;

        // var widgets = [
        //     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        //     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        //     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        //         "url": "http://lorempixel.com/400/200/"},
        //     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        //     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        //     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        //         "url": "https://youtu.be/AM2Ivdi9c4E" },
        //     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": '<p>Having guided you through <a href="http://fieldguide.gizmodo.com/how-to-abandon-android-and-switch-to-ios-1794659232" target="_blank" rel="noopener">the not-all-that-straightforward process</a> of switching from Android to iOS, we’re back to tell you how to go in the opposite direction. (Make your mind up will you?) Going from Apple-powered devices to Google’s platform is either ridiculously easy or rather taxing, depending on your current…<span class="read-more-placeholder"></span></p>'}
        // ];

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
                });
        }

        function deleteWidget(widgetId) {
            var url = "/api/assignment/widget/"+widgetId;
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
    }
})();