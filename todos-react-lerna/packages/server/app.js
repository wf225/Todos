const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const http = require('http');
const path = require('path');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const app = express();

app.use(compression())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.AWS_LAMBDA) {
  // AWS serverless
  app.use(awsServerlessExpressMiddleware.eventContext())
  require('./routes.js')(app); // routes
  // Export your express server so you can import it in the lambda function.
  module.exports = app
}
else {
  // NODE server
  // 1. set port.
  const port = 8001;
  app.set('port', port);

  // 2. set the static files location: ./public/index.html
  console.log(path.join(__dirname, '../vertical'));
  app.use(express.static(path.join(__dirname, '../vertical')));

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
}
