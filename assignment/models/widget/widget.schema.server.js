var mongoose = require('mongoose');

const WIDGET_TYPES = ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'];

var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.Types.ObjectId, ref: "PageModel"},
    type: {type: String, enum: WIDGET_TYPES},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated : {type: Date, default: Date.now()}
}, {collection: "widget"});

module.exports = widgetSchema;