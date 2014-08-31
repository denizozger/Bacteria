const 
	s3 = require('s3'),
  AWS = require('aws-sdk'),
  logger = require('winston');

AWS.config.loadFromPath('./config/aws_config.json');

module.exports = function(config) {

  this.upload = function(image, filename, callback) {

    var s3 = new AWS.S3(); 
    var params = {
      Bucket: config.cdn.url, 
      Key: config.cdn.uploadDirectory + '/' + filename, 
      Body: image.data
    };

    logger.info('Uploading... ' + filename + ' (' + image.data.length + ' bytes)');   

    // if (image.getFilename() !== filename) {
    //   logger.info('************************************')
    //   logger.info('Image filename mismatch: ' + image.getFilename() + ' VS ' + filename)
    //   logger.info('************************************')
    // }

    s3.putObject(params, function(err, data) {
        if (err) return console.error(err);
        
        logger.info('Upload complete: ' + params.Bucket + '/' + params.Key + ' (' + image.data.length + ' bytes)');   

        if (callback) {
          callback(err, image.data);
        }
     });
  }

  return this;
}
