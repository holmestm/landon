var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "eu-west-2"
});

console.log("Writing entries to Services table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var amenitiesData = 
  JSON.parse(fs.readFileSync('../components/data/amenities.json', 'utf8'));

amenitiesData.forEach(function(amenity) {
  var params = {
    TableName: "Services",
    Item: {
      "name": amenity
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for amenity",
                    amenity, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", amenity, "to table.")
  })
});