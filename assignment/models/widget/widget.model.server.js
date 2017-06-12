var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require('../widget/widget.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
//widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel.create(widget)
        .then(function (widget) {
            pageModel
                .addWidget(pageId, widget._id)
        });
}

function findWidgetById(widgetId){
    return widgetModel.findById(widgetId);
}

function findAllWidgetsForPage(pageId){
    return widgetModel
        .find({_page: pageId})
        .populate('_page')
        .exec();
}

function updateWidget(widgetId, newWidget) {
    return widgetModel.update({_id: widgetId}, {$set: newWidget})
}

function deleteWidget(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (widget) {
            return pageModel
                .deleteWidget(pageId, widgetId);
        });

}