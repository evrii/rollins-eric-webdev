var mongoose = require('mongoose');

const CONTENT_TYPES = ['COURSE', 'LECTURE'];

var contentSchema = mongoose.Schema({
    searchKey: String,
    name: String,
    type: {type: String, enum: CONTENT_TYPES},
    organization: String,
    author: String,
    description: String,
    url: String,
    datePublished : {type: Date}
}, {collection: "content"});

module.exports = contentSchema;