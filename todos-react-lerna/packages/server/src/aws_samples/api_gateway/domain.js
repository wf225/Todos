var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
});

var apigateway = new AWS.APIGateway();

// createApiKey
// apigateway.createApiKey(params, function (err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });

// getDomainNames
var params = {
};
apigateway.getDomainNames(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});

// getDomainName
params = {
  domainName: "webarx-non-prod.web-platform.io" // 'STRING_VALUE' /* required */
};
apigateway.getDomainName(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});