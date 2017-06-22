const app = require('../../express');
var contentModel = require('../models/content/content.model.server');
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/project/uploads' });

var results = []

// var widgets = [
//     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
//     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
//         "url": "http://lorempixel.com/400/200/"},
//     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
//     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
//         "url": "https://youtu.be/AM2Ivdi9c4E" },
//     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": '<p>Having guided you through <a href="http://fieldguide.gizmodo.com/how-to-abandon-android-and-switch-to-ios-1794659232" target="_blank" rel="noopener">the not-all-that-straightforward process</a> of switching from Android to iOS, we’re back to tell you how to go in the opposite direction. (Make your mind up will you?) Going from Apple-powered devices to Google’s platform is either ridiculously easy or rather taxing, depending on your current…<span class="read-more-placeholder"></span></p>'}
// ];

app.post('/api/project/content/:contentId/user/:userId', addContentToUser);
app.get('/api/project/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/project/widget/:widgetId', findWidgetById);
app.put('/api/project/widget/:widgetId', updateWidget);
app.put('/api/project/page/:pageId/widget', moveWidget);
app.delete('/api/project/widget/:widgetId', deleteWidget);

app.post ("/api/project/upload", upload.single('myFile'), uploadImage);


function addContentToUser(req, res) {
    var content = req.body;
    var userId = req.params['userId'];
    contentModel
        .createContentForUser(userId, content)
        .then(function (website) {
            res.json(website);
        }, function (response) {
            var t = 7;
        });
}

function findAllWidgetsForPage(req, res) {
    results = []
    var pageId = req.params['pageId'];
    var count;
    for (count = 0; count<widgets.length; count++){
        if(widgets[count].pageId === pageId){
            widgets[count].accessed = new Date();
            results.push(widgets[count]);
        }
    }
    res.json(results);
}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = getWidgetById(widgetId);
    if(widget){
        res.send(widget);
        return;
    }
    else{
        res.sendStatus(404);
    }
}

function getWidgetById(widgetId){
    for(var w in widgets) {
        if(widgets[w]._id === widgetId){
            return widgets[w];
        }
    }
    return null;
}

function updateWidget(req, res) {
    var widget = req.body;

    for (var w in widgets) {
        if (widgets[w]._id === req.params['widgetId']) {
            widget.accessed = new Date();
            widgets[w] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];

    for(var w in widgets) {
        if(widgets[w]._id === widgetId){
            widgets.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget = getWidgetById(widgetId);
    widget.url = '/project/uploads/'+filename;

    var callbackUrl   = "/project/index.html#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;

    res.redirect(callbackUrl);
}

function moveWidget(req, res){
    var initialIndex = parseInt(req.query['initial']);
    var finalIndex = parseInt(req.query['final']);

    var originalWidget =  JSON.parse(JSON.stringify(widgets[initialIndex]));

    // console.log("Start:" + initialIndex)
    // console.log("End:" + finalIndex)
    // console.log(widgets)
    console.log(widgets)


    if(finalIndex < initialIndex){
        console.log("Cowboy");
        widgets.splice(finalIndex,0,originalWidget);
        widgets.splice(initialIndex+1, 1)
    }
    else if(finalIndex > initialIndex){
        console.log("Space Ranger");
        widgets.splice(finalIndex+1,0,originalWidget);
        widgets.splice(initialIndex, 1)
    }
    console.log(widgets)
    res.sendStatus(200);
    return;
}