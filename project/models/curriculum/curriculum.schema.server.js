var mongoose = require('mongoose');

var curriculumSchema = mongoose.Schema({
    name: String,
    description: String,
    datePublished : {type: Date},
    content: [{type: mongoose.Schema.Types.ObjectId, ref: "ContentModel"}]
}, {collection: "curriculum"});

module.exports = curriculumSchema;