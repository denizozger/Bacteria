Bacteria.js
===

Given a set of image URL, this library resizes them and uploads to Amazon CDN.

The steps are:
- Get image URLs from a MySQL database
- Download and save them on disc
- Resize and save them again
- Upload to Amazon S3

All steps are handled by seperate modules, so if you have a PostgreSQL database or use Rackspace cloud then you should eaisly be able to modify.

## Dependencies
[ImageMagick]
```
brew install imagemagick
```

## Running locally

- Clone the repository
- Create config/aws_config.json
- Populate with your AWS credentials in this format:
```
{
	"accessKeyId": "yours",
	"secretAccessKey": "yours",
	"region": "your-region"
}```
- Run the application
```
npm install
TEST=true node --harmony bacteria.js
```
If you omit test variable, the application will try to connect to database.

Every other configuration that you need to make should go in config/congif.js

[ImageMagick]:http://www.imagemagick.org/
