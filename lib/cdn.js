const 
	s3 = require('s3'),
  AWS = require('aws-sdk');

AWS.config.loadFromPath('./config/aws_config.json');

module.exports = function(config) {

  this.upload = function(image, filename, callback) {

    var s3 = new AWS.S3(); 
    var params = {
      Bucket: 'cdn.mosttalked.com', 
      Key: config.cdn.uploadDirectory + '/' + filename, 
      Body: image.data
    };

    console.log('Uploading... ' + filename + ' (' + image.data.length + ' bytes)');   

    if (image.getFilename() !== filename) {
      console.log('************************************')
      console.log('Image filename mismatch: ' + image.getFilename() + ' VS ' + filename)
      console.log('************************************')
    }

    s3.putObject(params, function(err, data) {
        if (err) return console.error(err);
        
        console.log('Upload complete: ' + params.Bucket + '/' + params.Key + ' (' + image.data.length + ' bytes)');   

        if (callback) {
          callback(err, image.data);
        }
     });
  }

  return this;
}
