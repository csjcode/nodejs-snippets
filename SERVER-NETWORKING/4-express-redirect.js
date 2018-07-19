
// Redirect url

const express = require('express');
const http = require("http");
const app = express();
const server = http.createServer(app);
const port = 3000;

server.listen(port);

app.get('/freshpatents', function(req, res) {
	res.redirect('https://www.freshpatents.com/');
 });

console.log(`Server listening on port ${port}`)