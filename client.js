const webSocket = new WebSocket("ws://localhost:9898/");
var tables = ["#table1", "#table2", "#table3", "#table4", "#table5", "#table6"];
var currentUser = { username: "", password: "" };
var userdata;
// Function to run on click of login button
$("#loginButton").click(() => {
  currentUser.username = $("#username").val();
  currentUser.password = $("#password").val();
  localStorage.setItem("username", currentUser.username);
  localStorage.setItem("password", currentUser.password);
  webSocket.send(JSON.stringify(currentUser));
  window.location.pathname = "index.html";
  return false;
});

// Opening the websocket and requesting data from server
webSocket.onopen = () => {
  console.log("Web socket client connected");
  webSocket.send("requesting data");
};

// On getting message from server
webSocket.onmessage = (message) => {
  var data = JSON.parse(message.data);
  console.log(data.TableData);
  var username = localStorage.getItem("username");
  console.log(username);
  userdata = data.TableData;
  data.TableData.forEach((element, ind) => {
    for (const [key, value] of Object.entries(element)) {
      var markUp = "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
      $(tables[ind]).append(markUp);
    }
    if (
      (element["First Name"] + element["Last Name"]).toLowerCase() ===
      username.toLowerCase()
    ) {
      console.log(element["First Name"]);
      var markUp = "<button>Edit</button>";
      $(tables[ind]).append(markUp);
      localStorage.setItem("ind", ind);
    }
  });
};

$("table").on("click", "button", function (e) {
  e.preventDefault();
  var ind = localStorage.getItem("ind");
  $("#fname").val(userdata[ind]["First Name"]);
  $("#lname").val(userdata[ind]["Last Name"]);
  $("#age").val(userdata[ind]["Age"]);
  $("#pro").val(userdata[ind]["Profession"]);
});

$("addBtn").click((e) => {
  e.preventDefault();
  var fname = $("#fname").val();
  var lname = $("#lname").val();
  var age = $("#age").val();
  var pro = $("#pro").val();
  
});
