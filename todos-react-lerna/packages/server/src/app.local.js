const express = require('express')
const http = require('http');
const path = require('path');
const app = require('./app')

// NODE server
// 1. set the static files location: ./public/index.html
app.use(express.static(path.join(__dirname, '../../vertical')));

// 2. set port.
const port = 8001;
app.set('port', port);

// 3. set routes
require('./routes.js')(app);

// 4. strat listen
app.listen(port, () => {
    console.log("Server listening on port %s", port);
});

// OR:
// const server = http.createServer(app);
// const hostname = '127.0.0.1';
// server.listen(port, hostname, () => {
//   console.log("Server listening on port %s", port);
// });