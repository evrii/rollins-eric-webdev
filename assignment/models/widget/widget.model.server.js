var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel.create(widget)
        .then(function (widgetResponse) {
            widget = widgetResponse
            pageModel
                .addWidget(pageId, widgetResponse._id)
        })
        .then(function (response) {
            return widget;
        })
}

function findWidgetById(widgetId){
    return widgetModel.findById(widgetId);
}

function findAllWidgetsForPage(pageId){
    return widgetModel
        .find({_page: pageId})
        .sort({ index : 1})
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


function reorderWidget(pageId, start, end) {
    if (start < end){
        return widgetModel
            .update({index:{ $gt: start, $lte: end }}, {$inc:{index:-1}}, {multi:true})
            .then(function (response) {
                return widgetModel
                    .update({index: start}, {index: end});
            });
    }

    else if(start > end){
        return widgetModel
            .update({index:{ $gte: end, $lt: start }}, {$inc:{index:1}}, {multi:true})
            .then(function (response) {
                return widgetModel
                    .update({index: start}, {index: end});
            });
    }

}


function findWidgetByIndex(pageId, index){
    return userModel.findOne({'index': index, '_page': pageId});
}

