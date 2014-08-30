#!/usr/bin/env node --harmony
'use strict';

const 
  config = require('./config/config.js')(),
  database = require('./lib/db.js')(config.database),
  imageFetcher = require('./lib/imageFetcher.js')(config),
  imageResizer = require('./lib/imageResizer.js')(config),
  cdn = require('./lib/cdn.js')(config),
  async = require('async'),
  fs = require('fs');

var Image = function () {};

Image.prototype.getExtension = function () {
 return this.url.substr((~-this.url.lastIndexOf('.') >>> 0) + 2);
};

Image.prototype.getFilename = function (dimensions) {
  if (dimensions) {
    return this.id + '-' + dimensions.height + 'x' + dimensions.width + '.' + this.getExtension();
  } else {
    return this.id + '-' + this.height + 'x' + this.width + '.' + this.getExtension();
  }
};

Image.prototype.getFullPath = function (dimensions) {
  return 'resizedImages/' + this.getFilename(dimensions);
};

database.getURLs(Image, function (images) {
  async.each(images, function(image) {
    imageFetcher.getImage(image, null, function(image) {
      async.each(config.resizeTo, function(resizeTo){

        imageResizer.resizeAndSave(image, resizeTo, function(image) {

          var filename = image.getFilename();
          var fullpath = image.getFullPath();

          fs.readFile(fullpath, null, function (err, data) {
            if (err) {
              return console.log(err);
            }

            image.data = data;

            // if (filename != image.getFilename() || fullpath != image.getFullPath()) {
            //   console.log(filename + ' VS ' + image.getFilename() + ' data:' + data.length);
            //   console.log(fullpath + ' VS ' + image.getFullPath() + ' data:' + data.length)
            // }

            cdn.upload(image, filename);
          });

        });
      });
    });   
  });
});

