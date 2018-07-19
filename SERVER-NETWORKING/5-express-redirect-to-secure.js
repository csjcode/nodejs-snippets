// Secure Redirect of Basic Node.js Web Server running on port 3000

const https = require('https');
const http = require('http');
const express = require('express');
const fs = require('fs');
const app = express();
const port = 80;
const portSSL = 443;

// --- SSL Certificate, uncomment fs if SSL cert available
const sslOptions = '';
// const sslOptions = {
//     key: fs.readFileSync('./key.pem'),
//     cert: fs.readFileSync('./cert.pem')
// };

const isSecure = (req, res, next) => req.secure ? next() : res.redirect('https://' + req.hostname + req.url)

app.all('*', isSecure); // at top of routing calls

http.createServer(app).listen(port)
https.createServer(sslOptions, app).listen(portSSL)

console.log(`Server on http port ${port} and https port ${portSSL}`);