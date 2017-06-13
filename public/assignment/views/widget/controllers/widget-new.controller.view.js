(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController)

    function widgetNewController($routeParams,
                               $location,
                               widgetService) {


        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.createWidget = createWidget;

        function init() {
            model.widgets = widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(renderWidgets);
        }
        init();

        function renderWidgets(response) {
            model.widgets = response;
        }

        function createWidget(widgetType) {
            var widget = {};
            widget.pageId = model.pageId;
            widget.type = widgetType.toUpperCase();
            if("youtube" === widgetType.toLowerCase()){
                widget.url = 'https://youtu.be/WLIfbiTUMiU';
                widget.width = "100%";
            }
            else if("image" == widgetType.toLowerCase()){
                widget.url = 'http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Mammals/H-P/platypus-swimming-closeup.ngsversion.1396530615748.jpg';
                widget.width = "100%";
            }
            else if("heading" == widgetType.toLowerCase()){
                widget.size = 3;
                widget.text = "Default Heading";
            }
            else if("html" == widgetType.toLowerCase()){
                widget.size = 3;
                widget.text = "Default Heading";
            }
            else if("text" == widgetType.toLowerCase()){
                widget.size = 3;
                widget.text = "Default Heading";
            }
            widget = widgetService
                .createWidget(widget, model.pageId)
                .then(function (response) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+response._id);
                }, function (response) {
                        var cat = 777;
                });

        }

    }
})();