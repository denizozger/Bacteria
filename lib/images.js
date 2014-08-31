const 
  http = require('http'),
	fs = require('fs'),
  gm = require('gm');

module.exports = function(config) {

  this.downloadImage = function(image, callback){

    console.log('Downloading... ' + image.url);

  	http.get(image.url, function(res) {
  	  var imageData = '';
  	  res.setEncoding('binary');

  	  res.on('data', function(chunk) {
  	    imageData += chunk;
  	  });

  	  res.on('end', function() {

        console.log('Downloaded: ' + image.url);

        fs.writeFile(config.imageFetcher.folderToDownloadImagesInto + '/' + image.id + '.' + image.getExtension(), 
          imageData, 'binary', function(err){
             if (err) throw err;
            
             console.log('Saved: ' + image.id + '.' + image.getExtension());

             if (callback) {
               callback(null, image);
             }
         });
        
  	  });
  	}).on('error', function(err) {
  	  console.log('Error in image fetcher: ' + err.message);

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

        console.log('Resize complete: ' + image.getFullPath());

        if (callback) {
          callback(err, image);
        }
    });

  }

  return this;
}


