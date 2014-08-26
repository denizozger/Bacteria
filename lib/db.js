var database = require('mysql');

module.exports = function(config) {

  this.getURLs = function(callback){
    
    var connection = database.createConnection(config);
    connection.connect();

    connection.query('SELECT url FROM imageurl', function(err, rows, fields) {
      if (err) throw err;

      var urls = [];

      for (var row in rows) {
        urls.push(rows[row].url);
        // console.log(rows[row].url);
      }

      if (callback) {
        callback(urls);
      }
    });

    connection.end(); 
  }

  return this;
}

