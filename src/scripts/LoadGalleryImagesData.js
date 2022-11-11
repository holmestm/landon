var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "eu-west-2"
});

console.log("Writing entries to GalleryImages table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var galleryImagesData = 
  JSON.parse(fs.readFileSync('../components/data/gallery_images.json', 'utf8'));

galleryImagesData.forEach(function(galleryImage) {
  var className = galleryImage.class;
  if (!className || (className.trim() == ""))
    className = "no_class";

  var params = {
    TableName: "GalleryImages",
    Item: {
      "src": galleryImage.imgref,
      "alt": galleryImage.alttext,
      "className": className
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for gallery images",
                    galleryImage.imgref, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", galleryImage.imgref, "to table.")
  });
});