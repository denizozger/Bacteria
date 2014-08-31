const 
  database = require('mysql'),
  logger = require('winston');

module.exports = function(config) {

  this.getURLs = function(Image, callback) {

    if (!process.env.TEST) {

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

          logger.info('Retrieved from database: ' + image.url);
          images.push(image);
          console.log(images)
        }

        if (callback) {
          callback(err, images);
        }
      });

      connection.end(); 

    } else {

      var db_dump = 
      [
        {
          "id": 1,
          "url": "http://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Macaca_nigra_self-portrait.jpg/434px-Macaca_nigra_self-portrait.jpg"
        },
        {
          "id": 2,
          "url": "http://gallery.photo.net/photo/9830588-lg.jpg"
        },
        {
          "id": 3,
          "url": "http://cmsdata.iucn.org/img/12a_27_16__mg_3044_82384.jpg"
        },
        {
          "id": 4,
          "url": "http://m6.i.pbase.com/o6/25/686825/1/143592606.RLtjSf4C.MacacanigraBlackCrestedMacaque.jpg"
        },
        {
          "id": 5,
          "url": "http://seancrane.com/blogphotos/black-crested-macaque-portrait.jpg"
        }
      ];

      var images = [];

      for (var row in db_dump) {
        var image = new Image();
        var imageRecord = db_dump[row];

        for(var k in imageRecord) {
          image[k] = imageRecord[k];
        } 

        images.push(image);
      }

      if (callback) {
        callback(null, images);
      }
    }
    
  }  

  return this;
}

