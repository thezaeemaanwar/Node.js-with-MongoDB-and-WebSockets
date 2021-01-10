const webSocket = new WebSocket("ws://localhost:9898/");
var data;
var tables = ["#table1", "#table2", "#table3", "#table4", "#table5", "#table6"];
webSocket.onopen = () => {
  console.log("Web socket client connected");
  webSocket.send("requesting data");
};
webSocket.onmessage = (message) => {
  data = JSON.parse(message.data);
  console.log(data);
  data.forEach((element, ind) => {
    for (const [key, value] of Object.entries(element)) {
      var markUp = "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
      $(tables[ind]).append(markUp);
      console.log(ind);
    }
  });
};

$("").click(() => {
  prevPath = window.location.href;
  path = prevPath.substring(0, prevPath.lastIndexOf("/") + 1);
  path = path + "index.html";
  alert(path);
  window.location.assign("path");
  //alert(path);
});

$(".tableContainer").append(() => {
  jQuery.map(data, function () {});
});
