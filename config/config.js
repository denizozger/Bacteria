module.exports = function() {

  this.database = {
    host     : process.env.DB_HOST || 'localhost',
    user     : process.env.DB_USER || 'bacteria',
    password : process.env.DB_PASSWORD || 'secret',
    database : process.env.DB_NAME || 'bacteria'
  };

  this.cdn = {
    uploadDirectory : 'story_images'
  }

  this.imageFetcher = {
    // if you change this, reflect it on .gitignore
  	folderToDownloadImagesInto : 'downloadedImages'
  };

  this.imageResizer = {
    // if you change this, reflect it on .gitignore
    folderToResizeImagesInto : 'resizedImages'
  };

  this.resizeTo = [{
  		height: 32,
  		width: 32,
  		format: 'jpeg'
    }, {
      height: 48,
      width: 48,
      format: 'jpeg'
    }, {
      height: 640,
      width: 640,
      format: 'jpeg'
    }
  ];

  return this;
}