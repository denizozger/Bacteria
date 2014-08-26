#!/usr/bin/env node --harmony
'use strict';

var config = require('./config/config.js')();
var database = require('./lib/db.js')(config.database);
var imageFetcher = require('./lib/imageFetcher.js')();

var urls = database.getURLs(function (urls) {

  imageFetcher.getImage(urls[0], function(imageData) {
    
    // create small medium large etc images
    // https://nodejsmodules.org/pkg/easyimage (or maybe http://aheckmann.github.io/gm)

    // upload them to amazon s3
    // https://devcenter.heroku.com/articles/s3-upload-node
    // https://github.com/awssum/awssum-amazon-s3/
    // https://github.com/madhums/node-imager

  });
});

