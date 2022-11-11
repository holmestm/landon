var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "eu-west-2"
});

console.log("Writing entries to ArrivalInfo table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var arrivalInfoData = 
  JSON.parse(fs.readFileSync('../components/data/arrival_info.json', 'utf8'));

arrivalInfoData.forEach(function(arrivalInfo) {
  var params = {
    TableName: "ArrivalInfo",
    Item: {
      "name": arrivalInfo.name,
      "info": arrivalInfo.info
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for arrival info",
                    arrivalInfo.name, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", arrivalInfo.name, "to table.")
  });
});