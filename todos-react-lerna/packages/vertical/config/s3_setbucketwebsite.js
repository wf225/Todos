/**
 * Setting a Bucket Website Configuration.
 * Usage: node s3_setbucketwebsite.js BUCKET_NAME INDEX_PAGE ERROR_PAGE
 */

var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
// AWS.config.loadFromPath('./config.json');

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Create JSON for setBucketWebsite parameters
var staticHostParams = {
  Bucket: '',
  WebsiteConfiguration: {
  ErrorDocument: {
    Key: ''
  },
  IndexDocument: {
    Suffix: ''
  },
  }
};

// Insert specified index and error documents into params JSON
staticHostParams.Bucket = process.argv[2];
staticHostParams.WebsiteConfiguration.IndexDocument.Suffix = process.argv[3];
staticHostParams.WebsiteConfiguration.ErrorDocument.Key = process.argv[4];

// set the new policy on the selected bucket
s3.putBucketWebsite(staticHostParams, function(err, data) {
  if (err) {
    // display error message
    console.log("Error", err);
  } else {
    // update the displayed policy for the selected bucket
    console.log("Success", data);
  }
});
