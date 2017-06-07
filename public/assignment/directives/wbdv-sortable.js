(function () {
    angular
        .module('WAM')
        .directive('wbdvSortable', wbdvSortable);

    var pageID;
    function wbdvSortable($routeParams, widgetService) {
        pageId = $routeParams['pageId'];
        function linkFunction(scope, element) {
            var startIndex;
            var endIndex;
            $(element).sortable({
                start: function(event, ui) {
                    initialIndex = ui.item.index();
                },
                stop: function( event, ui ) {
                    finalIndex = ui.item.index();
                    widgetService
                        .moveWidget(initialIndex, finalIndex, pageId);
                }
            });
        }

        return {
            link: linkFunction
        }
    }


})();