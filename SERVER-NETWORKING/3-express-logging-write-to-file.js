/* ---------------------------------------------------------------------------

This is very basic server logging boilerplate.
See other snippets for more in-depth examples.

npm i -S express morgan

---------------------------------------------------------------------------*/

const express = require('express');
const http = require('http');
const morgan = require('morgan');
var fs = require('fs')
var path = require('path')
const app = express();

// --- Server Setup

const port = process.env.PORT || 3000;
const server = http.createServer(app); 
server.listen(port);

// --- Create write stream to append log events

var accessLogFile = fs.createWriteStream(path.join(__dirname, '/access.log'), {flags: 'a'})

// --- Logger with Morgan, and write to file

app.use(morgan(':method :url :status :res[content-length] - :response-time ms',{stream: accessLogFile})); // Log msg to file
app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); // Log msg to console

// app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]')); // Default Apache output
// app.use(morgan(':method :url :status :response-time ms - :res[content-length]')); // Colored status
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); // Minimal
// app.use(morgan('combined', { skip: function (req, res) { return res.statusCode < 400 }})); // Error responses only

// --- Routes

app.get('/',function (req,res) {
	res.send('Hello World');
});

app.get('/test',function (req,res) {
	res.send('Hello Test');
});

app.get('/test.html',function (req,res) {
	res.sendFile(__dirname + '/test.html');
});


// --- Log server port

console.log('Server listening on: ', port);