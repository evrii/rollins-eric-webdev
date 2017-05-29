(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController)

    function widgetEditController($routeParams,
                                   $location,
                                   widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        model.deleteWidget = deleteWidget;

        function init() {
            model.widgets = widgetService.findAllWidgetsForPage(model.pageId);
            model.widget = widgetService.findWidgetById(model.widgetId);
            var g ="ggggg"
        }
        init();

        function deleteWidget(widgetId) {
            widgetService.deleteWidget(widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }

    }
})();