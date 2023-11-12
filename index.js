const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
let router = require('./routes');
const db = require('./db');
const https = require('https');
const fs = require('fs');

app.use(express.urlencoded({extended: true}));


app.use(express.json());
app.use(express.static("express"));
// default URL for website
app.use('/teacher', router)

const options = {
  key: fs.readFileSync('/home/rpi2/sudotest/website2/private.key'),
  cert: fs.readFileSync('/home/rpi2/sudotest/website2/certificate.crt'),
  passphrase: 'manuallyresurectprocesses'
};

//const server = http.createServer(app);
const server = https.createServer(options, app);

const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);