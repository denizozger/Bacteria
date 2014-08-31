const 
  http = require('http'),
	fs = require('fs'),
  gm = require('gm'),
  logger = require('winston');

module.exports = function(config) {

  this.downloadImage = function(image, callback){

    logger.info('Downloading... ' + image.url);

  	http.get(image.url, function(res) {
  	  var imageData = '';
  	  res.setEncoding('binary');

  	  res.on('data', function(chunk) {
  	    imageData += chunk;
  	  });

  	  res.on('end', function() {

        logger.info('Downloaded: ' + image.url);

        fs.writeFile(config.imageFetcher.folderToDownloadImagesInto + '/' + image.id + '.' + image.getExtension(), 
          imageData, 'binary', function(err){
             if (err) throw err;
            
             logger.info('Saved: ' + image.id + '.' + image.getExtension());

             if (callback) {
               callback(null, image);
             }
         });
        
  	  });
  	}).on('error', function(err) {
  	  logger.info('Error in image fetcher: ' + err.message);

      if (callback) {
        callback(err, image);
      }
  	}); 
    
  }

  this.resizeAndSave = function(image, resizeTo, callback) {

    var imageToResize = config.imageFetcher.folderToDownloadImagesInto + '/' + image.id + '.' + image.getExtension();

    gm(imageToResize)
      .resize(resizeTo.height, resizeTo.width)
      .noProfile()
      .options({imageMagick: true})
      .write(config.imageResizer.folderToResizeImagesInto + '/' + image.getFilename(resizeTo), function (err, data) {
        if (err) return console.error(err);

        image.height = resizeTo.height;
        image.width = resizeTo.width;

        logger.info('Resize complete: ' + image.getFullPath());

        if (callback) {
          callback(err, image);
        }
    });

  }

  return this;
}


