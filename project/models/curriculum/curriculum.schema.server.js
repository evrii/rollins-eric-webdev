var mongoose = require('mongoose');

var curriculumSchema = mongoose.Schema({
    name: String,
    description: String,
    datePublished : {type: Date}
}, {collection: "curriculum"});

module.exports = curriculumSchema;