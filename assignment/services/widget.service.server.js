const app = require('../../express');
var widgetModel = require('../models/widget/widget.model.server');

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

var results = [];

app.post('/api/assignment/page/:pageId/widget', createWidget);
app.get('/api/assignment/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.put('/api/assignment/page/:pageId/widget', reorderWidget);
app.delete('/api/assignment/page/:pageId/widget/:widgetId', deleteWidget);

app.post ("/api/assignment/upload", upload.single('myFile'), uploadImage);


function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params['pageId'];
    var index = -1;
    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            index = widgets.length;
            widget.index = index;
            return widgetModel
                .createWidget(pageId, widget)
        })
        .then(function (widget) {
            res.json(widget);
        }, function (widget) {
            var goat = 8867;
        });
}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pageId'];
    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets);
        });
}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        });
}

function getWidgetById(widgetId){
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            return widget;
        });
    return null;
}

function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params['widgetId'];

    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.json(status);
        });
}

function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var pageId = req.params['pageId'];

    widgetModel
        .deleteWidget(pageId, widgetId)
        .then(function (status) {
            res.json(status);
        });
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
    widget.url = '/assignment/uploads/'+filename;

    var callbackUrl   = "/assignment/index.html#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;

    res.redirect(callbackUrl);
}

function reorderWidget(req, res){
    var initialIndex = parseInt(req.query['initial']);
    var finalIndex = parseInt(req.query['final']);
    var pageId = req.params['pageId'];

    widgetModel
        .reorderWidget(pageId, initialIndex, finalIndex)
        .then(function (widget) {
            res.json(widget);
        },
        function (widget) {
            var x = 7;
        });

    console.log(widgets)
    res.sendStatus(200);
    return;
}