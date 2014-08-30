const 
	s3 = require('s3'),
  AWS = require('aws-sdk');

AWS.config.loadFromPath('./config/aws_config.json');

module.exports = function(config) {

  this.upload = function(image, filename, callback) {

    var imageData = image.data;
    var s3 = new AWS.S3(); 
    var params = {
      Bucket: 'cdn.mosttalked.com', 
      Key: config.cdn.uploadDirectory + '/' + filename, 
      Body: imageData
    };

    console.log('Uploading... ' + filename + ' (' + imageData.length + ' bytes)');   

    // if (imageData.length !== image.data.length) {
    //   console.log('Image data mismatch: ' + filename + ' ' + imageData.length + ' VS ' + image.data.length)
    // }

    s3.putObject(params, function(err, data) {
        if (err) return console.error(err);
        
        console.log('Upload complete: ' + params.Bucket + '/' + params.Key + ' (' + imageData.length + ' bytes)');   

        if (callback) {
          callback(err, imageData);
        }
     });
  }

  return this;
}
