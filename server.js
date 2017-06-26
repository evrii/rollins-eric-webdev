var app = require('./express');
var bodyParser = require('body-parser');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: "put some text here" }));


app.use(passport.initialize());
app.use(passport.session());



// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

var port = process.env.PORT || 3000;

//require ('./assignment/app.js');
require ('./project/app.js')

app.listen(port);

