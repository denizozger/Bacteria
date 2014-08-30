const 
  http = require('http'),
	fs = require('fs');

module.exports = function(config) {

  this.getImage = function(image, callbackWhenImageIsDownloaded, callbackWhenImageIsSaved){

    console.log('Downloading... ' + image.url);

  	http.get(image.url, function(res) {
  	  var imageData = '';
  	  res.setEncoding('binary');

  	  res.on('data', function(chunk) {
  	    imageData += chunk;
  	  });

  	  res.on('end', function() {

        console.log('Downloaded: ' + image.url);

        if (callbackWhenImageIsDownloaded) {
          callbackWhenImageIsDownloaded(image);
        }

        fs.writeFile(config.imageFetcher.folderToDownloadImagesInto + '/' + image.id + '.' + image.getExtension(), 
          imageData, 'binary', function(err){
             if (err) throw err;
            
             console.log('Saved: ' + image.id + '.' + image.getExtension());

             if (callbackWhenImageIsSaved) {
               callbackWhenImageIsSaved(image);
             }
         });
        
  	  });
  	}).on('error', function(e) {
  	  console.log('Got error: ' + e.message);
  	}); 
    
  }

  return this;
}


