const http = require('http');
const webSocketServer = require('websocket').server;

const port = 9898
// Creating a http server
const server = http.createServer();
server.listen(port);

// 
const wsServer = new webSocketServer({httpServer:server});

wsServer.on('request', (request)=>{
    const connection = request.accept(null, request.origin);
    connection.on('message', (message)=>{
        console.log('recieved Message : '+message.utf8Data);
        connection.sendUTF("Hi this is web socket server");
    });
    connection.on('close', (reasonCode, description)=>{
        console.log("Connection is disconnected by client");
    })
})

