const 
  gm = require('gm');

module.exports = function(config) {

  this.resizeAndSave = function(image, resizeTo, callback) {

    var imageToResize = config.imageFetcher.folderToDownloadImagesInto + '/' + image.id + '.' + image.getExtension();

    gm(imageToResize)
      .resize(resizeTo.height, resizeTo.width)
      .noProfile()
      .options({imageMagick: true})
      .write(config.imageResizer.folderToResizeImagesInto + '/' + image.getFilename(resizeTo), function (err, data) {
        if (err) {
          return console.error(err);
        } 

        image.height = resizeTo.height;
        image.width = resizeTo.width;

        console.log('Resize complete: ' + image.getFullPath());

        if (callback) {
          callback(image);
        }
    });

  }

  return this;
}
