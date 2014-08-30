#!/usr/bin/env node --harmony
'use strict';

const 
  config = require('./config/config.js')(),
  database = require('./lib/db.js')(config.database),
  imageFetcher = require('./lib/imageFetcher.js')(config),
  imageResizer = require('./lib/imageResizer.js')(config),
  cdn = require('./lib/cdn.js')(config),
  async = require('async'),
  fs = require('fs'),
  Q = require('q');

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

var
  resizeAndSave = Q.denodeify(imageResizer.resizeAndSave),
  readFile = Q.denodeify(fs.readFile);
  upload = Q.denodeify(cdn.upload);

database.getURLs(Image, function (err, images) {
  async.each(images, function(image) {
    imageFetcher.getImage(image, function(err, image) {
      async.each(config.resizeTo, function(resizeTo) {
        Q.async(function* () {
          var imageData;

          image = yield resizeAndSave(image, resizeTo);

          var filename = image.getFilename();

          imageData = yield readFile(image.getFullPath());

          image.data = imageData;

          yield upload(image, filename);
          
        })();
      });
    });   
  });
});
