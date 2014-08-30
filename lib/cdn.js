const 
	s3 = require('s3');

var AWS = require('aws-sdk');

AWS.config.loadFromPath('./config/aws_config.json');

// AWS.config.accessKeyId = ''; 
// AWS.config.secretAccessKey = ''; 
// AWS.config.region = 'eu-west-1'; 

module.exports = function(config) {

  this.upload = function(image, filename, callback) {

    var imageData = image.data;
    var s3 = new AWS.S3(); 

    console.log('Uploading... ' + filename + ' (' + imageData.length + ' bytes)');   

    s3.createBucket({Bucket: 'cdn.mosttalked.com'}, function() {

      var params = {Bucket: 'cdn.mosttalked.com', Key: 'story_images/' + filename, Body: imageData};

      // if (imageData.length !== image.data.length) {
      //   console.log('Image data mismatch: ' + filename + ' ' + imageData.length + ' VS ' + image.data.length)
      // }

      s3.putObject(params, function(err, data) {
          if (err) {
            return console.error(err);
          } else {
            console.log('Upload complete: ' + params.Bucket + '/' + params.Key);   
          }

          if (callback) {
            callback(err);
          }
       });

    });
  }

  return this;
}
