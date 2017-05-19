/**
 * Usage: node s3_createbucket.js BUCKET_NAME
 */

var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
// AWS.config.loadFromPath('./config.json');

// Create S3 service object
s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// Create params for S3.createBucket
var bucketParams = {
    Bucket: process.argv[2],
    ACL: 'public-read'
};

// call S3 to create the bucket
s3.createBucket(bucketParams, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Location);
    }
});