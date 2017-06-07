(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController)

    function widgetListController ($routeParams,
                                   $sce,
                                   widgetService) {

        var model = this;
        model.trust = trust;
        model.getYoutubeEmbedUrl = getYoutubeEmbedUrl;
        model.widgetUrl = widgetUrl;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        function init() {
            model.widgets = widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(renderWidgets);
        }
        init();

        function renderWidgets (response) {
            model.widgets = response
        }

        /* DOES THIS NEED TO BE ADJUSTED? */
        function widgetUrl (widget) {
            var url = 'views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'.view.client.html'
            return url;
        }

        function getYoutubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/"
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length -1]
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trust(html) {
            //scrubbing the html
            return $sce.trustAsHtml(html)
        }
    }
})();