const http = require("http");
const webSocketServer = require("websocket").server;
const data = require("./data.json");

const port = 9898;
// Creating a http server
const server = http.createServer();
server.listen(port);

// creasting a web socket server
const wsServer = new webSocketServer({ httpServer: server });

// Respond on client request
wsServer.on("request", (request) => {
  const connection = request.accept(null, request.origin);
  connection.on("message", (message) => {
    stringData = JSON.stringify(data);
    console.log("recieved Message : " + message.utf8Data);
    if (message.utf8Data === "requesting data") {
      connection.send(stringData);
    }
    else {
      authenticateUser(JSON.parse(message.utf8Data));
      
    }
  });
  connection.on("close", (reasonCode, description) => {
    console.log("Connection is disconnected by client");
  });
});
