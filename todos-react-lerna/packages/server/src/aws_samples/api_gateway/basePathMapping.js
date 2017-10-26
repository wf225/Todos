var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
});

var apigateway = new AWS.APIGateway();

// getDomainNames
var params = {
};
// apigateway.getDomainNames(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });


// getDomainName
params = {
  domainName: "webarx-non-prod.web-platform.io" // "STRING_VALUE" /* required */
};
// apigateway.getDomainName(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });
// Return:
// { domainName: "webarx-non-prod.web-platform.io",
//   certificateArn: "arn:aws:acm:us-east-1:414840001553:certificate/692d744f-23d3-4434-9881-5ddbe13f4036",
//   certificateUploadDate: 2017-06-01T08:27:37.000Z,
//   distributionDomainName: "d2jxwsgywirj0j.cloudfront.net" }


//
params = {
  limit: 100
};
// apigateway.getRestApis(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });


//
params = {
  domainName: "webarx.web-platform.io"
};
// apigateway.getBasePathMappings(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });


params = {
  domainName: "webarx.web-platform.io",
  basePath: "v1"
};
// apigateway.getBasePathMapping(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });


//
// restapiId: "ik1o4kb14j", // master: ro5n2w438d
params = {
  domainName: "webarx.web-platform.io", /* required */
  restApiId: "ik1o4kb14j", // master: ro5n2w438d
  basePath: "v5",
  stage: ""
};
// apigateway.createBasePathMapping(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });


//
params = {
  domainName: "webarx.web-platform.io",
  basePath: "v5",
  patchOperations: [
    {
      "op": "replace",
      "path": "/restapiId", // NOTE: restapiId
      "value": "ro5n2w438d"
    },
    {
      "op": "replace",
      "path": "/stage",
      "value": "master"
    }
  ]
};
// apigateway.updateBasePathMapping(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });

params = {
};

apigateway.getApiKeys(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data);           // successful response
});
apigateway.getUsagePlans(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    // console.log(data);           // successful response
    for(item in data.items) {
      console.log(item);
    }
  }
});

params = {
  apiKey: 'rh79l7ke77', /* required */
  includeValue: true || false
};
apigateway.getApiKey(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});


params = {
  usagePlanId: '0ag81e' /* required */
};
apigateway.getUsagePlan(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data);           // successful response
  /**
  { id: '0ag81e',
  name: 'webarx-extension-service-green',
  description: 'Usage plan for webarx-extension-service green stage',
  apiStages: [ { apiId: 'bqkd73af21', stage: 'green' } ] }
   */
});

apigateway.getUsagePlanKeys(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data);           // successful response
  /**
   { items: 
   [ { id: 'rh79l7ke77',
       type: 'API_KEY',
       name: 'webarx-extension-service-green-apikey' } ] }
   */
});


// 
params = {
  keyId: 'rh79l7ke77', /* required */
  usagePlanId: '0ag81e' // green
};
// apigateway.deleteUsagePlanKey(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });

params = {
  keyId: 'rh79l7ke77', /* required */
  keyType: 'API_KEY', /* required */
  usagePlanId: '0ag81e' /* required */
};
apigateway.createUsagePlanKey(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});