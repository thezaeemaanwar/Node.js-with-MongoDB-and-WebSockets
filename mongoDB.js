

var mongo = require("mongodb");
var mongoClient = mongo.MongoClient;

var url = "mongodb://localhost:8080/usersDB";

mongoClient.connect(url,{ useUnifiedTopology: true }, function (err, db) {
  if (err) throw err;
  console.log("Database Created");
  db.close();
});
