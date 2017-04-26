const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const bodyParser = require('body-parser')

const hostname = '127.0.0.1';
const port = 8001;

app.set('port', port);
app.use(express.static('./packages/vertical')); // set the static files location ./public/index.html

app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// routes =====================================================================
require('./app/routes.js')(app);

// listen (start app with 'node server.js') ===================================
app.listen(port, () => {
  console.log("Server listening on port %s", port);
});
