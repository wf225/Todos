var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
});

AWS.config.apiVersions = {
  route53domains: '2014-05-15'
  // other service API versions
};

var route53 = new AWS.Route53({ apiVersion: '2013-04-01' });
var route53domains = new AWS.Route53Domains();

//
var params = {
};
route53.getHostedZoneCount(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});

//
params = {
  Id: "Z20YUUZEGEERWT" // 'STRING_VALUE' /* required */
};
route53.getHostedZone(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});