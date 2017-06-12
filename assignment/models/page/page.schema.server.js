var mongoose = require('mongoose')

var pageeSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"},
    name: String,
    title: String,
    description: String,
    dateCreated : {type: Date, default: Date.now()}
}, {collection: "page"});

module.exports = pageeSchema;