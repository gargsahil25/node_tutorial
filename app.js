// /*
// - Client and Server
// - What is Node.js? How JS runs on server? How to create a server in Node.js?
// - what are modules? How to write a module? How are modules created in Node.js?
// */

const express = require('express'),
	http = require('http');
	bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require('path');

const studentService = require('./services/studentService');

// // Creating new express app
var app = express();

// // Setting the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// // Adding static path
app.use(express.static(path.join(__dirname, '/public')));

// // Parsing body and cookies
app.use(bodyParser.json({ limit: '100mb' }));
app.use(cookieParser());

// // Setup api routes
app.get('/', sayHello, gotError, function(req, res) {
	res.send("hello");
});
app.get('/students', sayHello, studentService.getStudentsPage);
app.get('/toppers', sayHello, studentService.getToppers);

function sayHello(req, res, next) {
    console.log("hello", req.url);
    next();
    // next("ERROR");
}

function gotError(err, req, res, next) {
    console.log("error", err);
    // next();
    next(err);
}

// // Error handler
app.use(function(err, req, res, next) {
    console.log("ERROR OCCURRED !!", err);
    //next(err);
    next("Some error occurred");
});

var server = http.createServer(app).listen(8000, function() {
    console.log('info', 'Express server listening on port ' + 8000);
});