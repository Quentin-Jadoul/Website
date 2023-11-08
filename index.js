const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
let router = require('./routes');
// const db = require('./db');
app.use(express.urlencoded({extended: true}));


app.use(express.json());
app.use(express.static("express"));
// default URL for website
app.use('/', router)

const server = http.createServer(app);
const port = 80;
server.listen(port);
console.debug('Server listening on port ' + port);