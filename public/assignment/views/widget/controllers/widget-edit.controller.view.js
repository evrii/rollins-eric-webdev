(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController)

    function widgetEditController($routeParams,
                                   $location,
                                   widgetService) {

        var model = this;
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];

        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(renderWidgets);
            widgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget);
        }
        init();

        function renderWidget(response) {
            model.widget = response;
        }

        function renderWidgets(response) {
            model.widgets = response;
        }

        function updateWidget(widget) {
            widgetService
                .updateWidget(widget._id, widget)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                })

        }

        function deleteWidget(pageId, widgetId) {
            widgetService
                .deleteWidget(pageId, widgetId)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                })

        }

    }
})();