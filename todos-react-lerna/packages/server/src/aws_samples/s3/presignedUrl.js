const AWS = require("aws-sdk");
const mime = require('mime-types');

var config = {
  region: "us-east-1",
  version: "2006-03-01",
  signatureVersion: 'v4'
};

var s3 = new AWS.S3(config)
var bucket = 'webarx-extension-service-snapshot-assets';
var key = 'extension-assets/Hello Lambda/viewer.1.js';

// Pre-signing a getObject operation (synchronously)
var params = { Bucket: bucket, Key: key }; // expires in 60 seconds

var url = s3.headObject(params, (err, data) => {
  console.log(err);
  console.log(data);
});

var url = s3.getSignedUrl('getObject', params);
console.log('The get URL is', url);

// Pre-signing a putObject (asynchronously)
// NOTE: the ContentType is necessary
var params = { Bucket: bucket, Key: "public/hello.txt" };
s3.getObject(params, function (err, data) {
  if (err) {
    console.log(err);
    return err;
  }
  // No error happened
  // Convert Body from a Buffer to a String
  let objectData = data.Body.toString('utf-8'); // Use the encoding necessary
  console.log(objectData);
});

// ContentType is necessary.
let contentType = mime.lookup('file.html');
console.log(contentType);

params = { Bucket: bucket, Key: "public2/hello.1.js", ContentType: "application/javascript"}; //
// s3.getSignedUrl('putObject', params, function (err, url) {
//   console.log('The put URL is', url);
// });
url = s3.getSignedUrl('putObject', params);
console.log('The put URL is', url);


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