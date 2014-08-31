const 
  database = require('mysql');

module.exports = function(config) {

  this.getURLs = function(Image, callback) {
    
    var connection = database.createConnection(config);
    connection.connect();

    connection.query('SELECT id, url FROM image', function(err, rows, fields) {
      if (err) return console.error(err);

      var images = [];
      
      for (var row in rows) {
        var image = new Image();
        var imageRecord = rows[row];

        for(var k in imageRecord) {
          image[k] = imageRecord[k];
        } 

        console.log('Retrieved from database: ' + image.url);
        images.push(image);
      }

      if (callback) {
        callback(err, images);
      }
    });

    connection.end(); 
  }

  return this;
}

