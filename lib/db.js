const 
  database = require('mysql');

module.exports = function(config) {

  this.getURLs = function(Image, callback) {
    
    var connection = database.createConnection(config);
    connection.connect();

    connection.query('SELECT id, url FROM image_copy', function(err, rows, fields) {
      if (err) {
        return console.error(err);
      }

      var images = [];
      var image = new Image();

      for (var row in rows) {
        var imageRecord = rows[row];

        for(var k in imageRecord) {
          image[k] = imageRecord[k];
        } 

        images.push(image);
        console.log('Retrieved from database: ' + image.url);
      }

      if (callback) {
        callback(images);
      }
    });

    connection.end(); 
  }

  return this;
}

