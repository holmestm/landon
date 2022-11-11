var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "eu-west-2"
});

console.log("Writing entries to Accessibilities table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var accessibilitiesData = 
  JSON.parse(fs.readFileSync('../components/data/accessibilities.json', 'utf8'));

accessibilitiesData.forEach(function(accessibililty) {
  var params = {
    TableName: "Accessibilities",
    Item: {
      "name": accessibililty
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for accessibility",
                    accessibililty, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", accessibililty, "to table.")
  })
});