const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const app = express();

// app.use(compression()) // TODO: Maybe AWS Lambda don't support gizp.
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV == "production") {
  app.use(awsServerlessExpressMiddleware.eventContext()) // AWS serverless
  require('./routes.js')(app); // routes  
}

module.exports = app;
