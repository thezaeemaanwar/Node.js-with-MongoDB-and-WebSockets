const webSocket = new WebSocket("ws://localhost:9898/");
var data;

webSocket.onopen = () => {
  console.log("Web socket client connected");
  webSocket.send("requesting data");
};
webSocket.onmessage = (message) => {
  data = JSON.parse(message.data);
};

function changePage() {
  alert("inside function");
  alert(window.location.pathname);
}

$("#").click(() => {
  prevPath = window.location.href;
  path = prevPath.substring(0, prevPath.lastIndexOf("/") + 1);
  path = path + "index.html";
  alert(path);
  window.location.assign(path);
  //alert(path);
});

$(".tableContainer").append(() => {
  ///console.log(data);
  //data.map((table) => $("table"));
});
