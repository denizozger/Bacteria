var http = require('http'),
	fs = require('fs');

module.exports = function() {

  this.getImage = function(imageUrl, callback){

  	http.get(imageUrl, function(res) {
  	  var imageData = '';
  	  res.setEncoding('binary');

  	  res.on('data', function(chunk) {
  	    imageData += chunk;
  	  });

  	  res.on('end', function() {
        // Just in case you want to test 
        // fs.writeFile('logo.png', imageData, 'binary', function(err){
        //      if (err) throw err;
            
        //      console.log('File saved.');
        //  });

        if (callback) {
          callback(imageData);
        }
  	  });
  	}).on('error', function(e) {
  	  console.log('Got error: ' + e.message);
  	}); 
    
  }

  return this;
}


