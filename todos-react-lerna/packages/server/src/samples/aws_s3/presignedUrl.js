const AWS = require("aws-sdk");
const S3Client = require('aws-sdk/clients/s3');

var config = {
  region: "us-east-1",
  version: "2006-03-01"
};

var s3 = new S3Client(config)
var bucket = 'wubil-todos-deploy';
var key = 'public/index.html';

// Pre-signing a getObject operation (synchronously)
var params = { Bucket: bucket, Key: key, Expires: 60 }; // expires in 60 seconds
var url = s3.getSignedUrl('getObject', params);
console.log('The get URL is', url);

// Pre-signing a putObject (asynchronously)
// NOTE: the ContentType is necessary
var params = { Bucket: bucket, Key: "public/hello.txt", ContentType: "text/plain" };
s3.getSignedUrl('putObject', params, function (err, url) {
  console.log('The put URL is', url);
});


// Presiging post data with a known key
var params = {
  Bucket: bucket,
  Fields: {
    key: key
  }
};
s3.createPresignedPost(params, function (err, data) {
  if (err) {
    console.error('Presigning post data encountered an error', err);
  } else {
    console.log('The post data is', data);
  }
});