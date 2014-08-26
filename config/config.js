module.exports = function() {

  this.database = {
    host     : process.env.DB_HOST || 'localhost',
    user     : process.env.DB_USER || 'bacteria',
    password : process.env.DB_PASSWORD || 'secret',
    database : process.env.DB_NAME || 'bacteria'
  };

  this.amazonS3 = {
    accessKey : process.env.AWS_ACCESS_KEY,
    secretKey : process.env.AWS_SECRET_KEY,
    bucket : process.env.S3_BUCKET
  };

  return this;
}