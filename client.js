const webSocket = new WebSocket("ws://localhost:9898/");
var tables = ["#table1", "#table2", "#table3", "#table4", "#table5", "#table6"];
var currentUser = { username: "", password: "" };
webSocket.onopen = () => {
  console.log("Web socket client connected");
  webSocket.send("requesting data");
};
webSocket.onmessage = (message) => {
  var data = JSON.parse(message.data);
  console.log(data);
  data.TableData.forEach((element, ind) => {
    for (const [key, value] of Object.entries(element)) {
      var markUp = "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
      $(tables[ind]).append(markUp);
      console.log(ind);
      if (data.Users[ind].username === "Sherlockholmes") {
        $("p").text("Welcome, Sherlock");
      }
    }
  });
};

$("#loginButton").click(() => {
  currentUser.username = $("#username").val();
  currentUser.password = $("#password").val();
  webSocket.send(JSON.stringify(user));
  window.location.pathname = "index.html";
  return false;
});
console.log(currentUser);
