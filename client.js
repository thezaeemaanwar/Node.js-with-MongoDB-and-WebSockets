const webSocket = new WebSocket("ws://localhost:9898/");

webSocket.onopen = () => {
  console.log("Web socket client connected");
  webSocket.send("Hi, This is web socket client");
};
webSocket.onmessage = (message) => {
  console.log("recieved: " + message.data + " from server");
  $("p").text(message.data);
};

$("#loginButton").click(() => {
  document.location.pathname = "/index.html";
  alert(document.location.pathname);
});
