const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const http = require('http');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const app = express();

app.use(compression())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/*
// node server routes =========================================================
// app.use(express.static(__dirname + '/../vertical')); // set the static files location ./public/index.html

const hostname = '127.0.0.1';
const port = 8001;
app.set('port', port);

require('./routes.js')(app);

// listen (start app with 'node server.js') ===================================
app.listen(port, () => {
  console.log("Server listening on port %s", port);
});

// OR:
// const server = http.createServer(app);
// server.listen(port, hostname, () => {
//   console.log("Server listening on port %s", port);
// });
*/

// AWS serverless
app.use(awsServerlessExpressMiddleware.eventContext())

require('./routes.js')(app);

// Export your express server so you can import it in the lambda function.
module.exports = app
