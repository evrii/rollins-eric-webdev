const app = require('../../express');
var results = [];

var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
]

app.post('/api/assignment/website/:websiteId/page', createPage);
app.get('/api/assignment/website/:websiteId/page', findAllPagesForWebsite);
app.get('/api/assignment/page/:pageId', findPageById);
app.put('/api/assignment/page/:websiteId', updatePage);
app.delete('/api/assignment/page/:websiteId', deletePage);

function findAllPagesForWebsite(req, res) {
    results = []
    var websiteId = req.params['websiteId'];
    console.log(pages)
    for (var p in pages){
        if(pages[p].developerId === websiteId){
            pages[p].accessed = new Date();
            results.push(pages[v]);
        }
    }

    res.json(results);
}

function createPage(req, res) {
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.json(page);
}

function deletePage(pageId) {
    var page = findPageById(pageId);
    var index = pages.indexOf(page);
    pages.splice(index, 1);
}

function findPageById(pageId) {
    return pages.find(function (page) {
        return page._id === pageId
    });
}

function updatePage(req, res) {
    var page = req.body;

    for (var p in pages) {
        if (pages[p]._id === req.params['pageId']) {
            pages[p] = page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}