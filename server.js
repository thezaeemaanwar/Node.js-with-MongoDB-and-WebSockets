const http = require("http");
const webSocketServer = require("websocket").server;
const MongoClient = require("mongodb").MongoClient;

const port = 9898;
// Creating a http server
const server = http.createServer();
server.listen(port);

var Users;

// creasting a web socket server
const wsServer = new webSocketServer({ httpServer: server });

// Respond on client request
wsServer.on("request", (request) => {
  const connection = request.accept(null, request.origin);
  connection.on("message", (message) => {
    // if client is requesting data, send the data
    if (message.utf8Data === "requesting data") {
      DB(connection, "retrieve", {});
    } else {
      DB(connection, "else", JSON.parse(message.utf8Data));
    }
  });
  connection.on("close", (reasonCode, description) => {
    //console.log("Connection is disconnected by client");
  });
});
async function DB(connection, act, obj) {
  const uri =
    "mongodb+srv://nodejs-mongodb:nodejs-mongodb@cluster0.ulgkf.mongodb.net/usersDB?retryWrites=true&w=majority";

  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    if (act === "retrieve") await retrieveData(client);
    else editData(client, obj);
  } catch (e) {
    console.error(e);
  } finally {
    //await client.close();
  }
  connection.send(JSON.stringify(Users));
}

async function retrieveData(client) {
  const db = client.db("usersDB");
  const collection = db.collection("TableData");
  var data = await collection.find({}).toArray();
  Users = data;
}

async function editData(client, obj) {
  const db = client.db("usersDB");
  const collection = db.collection("TableData");
  console.log("inside edit");
  var query = { username: obj.username };
  console.log(obj);
  console.log("query:" + obj.username);
  var res = await collection.replaceOne(query, obj);
  console.log(res.modifiedCount + " " + res.matchedCount);
}
