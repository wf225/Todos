'use strict'
const awsServerlessExpress = require('aws-serverless-express');

process.env.AWS_LAMBDA = true;

const app = require('./app');

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes, and to the x-amazon-apigateway-binary-media-types array in
// simple-proxy-api.yaml, then redeploy (`npm run package-deploy`)
const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml'
];
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);

// Test code
// exports.handler = function(event, context, callback) {
//     var name = "World";
//     var responseCode = 200;
//     console.log("request: " + JSON.stringify(event));
//     var responseBody = {
//         message: "Hello " + name + "!",
//         input: event
//     };
//     var response = {
//         statusCode: responseCode,
//         headers: {
//             "x-custom-header" : "my custom header value"
//         },
//         body: JSON.stringify(responseBody)
//     };
//     console.log("response: " + JSON.stringify(response))
//     callback(null, response);
// };