/**
 * Deleting a Bucket Website Configuration.
 * Usage: node s3_deletebucketwebsite.js BUCKET_NAME
 */

var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.loadFromPath('./config.json');

// Create S3 service object
s3 = new AWS.S3({ apiVersion: '2006-03-01' });

var bucketParams = { Bucket: process.argv[2] };
// call S3 to delete policy for selected bucket
s3.deleteBucketWebsite(bucketParams, function (error, data) {
    if (error) {
        console.log("Error", err);
    } else if (data) {
        console.log("Success", data);
    }
});