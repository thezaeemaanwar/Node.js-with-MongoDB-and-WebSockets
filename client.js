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
  var pass = localStorage.getItem("password");
  userdata = data;
  var verified = false;
  data.forEach((element) => {
    console.log(element);
    console.log(username + " " + pass);
    if (element["username"] === username && element["password"] === pass)
      verified = true;
  });
  console.log(verified);
  if (verified) {
    data.forEach((element, ind) => {
      if ($(tables[ind] + " tr").length <= 1) {
        for (const [key, value] of Object.entries(element)) {
          if (
            key === "_id" ||
            key === "username" ||
            key === "password" ||
            key === "id"
          );
          else {
            var markUp = "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
            $(tables[ind]).append(markUp);
          }
        }
        if (element["username"] === username) {
          console.log(element["First Name"]);
          var markUp = "<button>Edit</button>";
          $(tables[ind]).append(markUp);
          localStorage.setItem("ind", ind);
        }
      }
    });
  } else {
    $("p").text("Wrong input try ! ");
    $("p").css("visibility", "visible");
  }
};

$("table").on("click", "button", function (e) {
  e.preventDefault();
  var ind = localStorage.getItem("ind");
  $("#fname").val(userdata[ind]["First Name"]);
  $("#lname").val(userdata[ind]["Last Name"]);
  $("#age").val(userdata[ind]["Age"]);
  $("#pro").val(userdata[ind]["Profession"]);
  $("#fam").val(userdata[ind]["Family Members"]);
});

$("#addBtn").click((e) => {
  console.log("In click add");
  var fname = $("#fname").val();
  var lname = $("#lname").val();
  var age = $("#age").val();
  var pro = $("#pro").val();
  var fam = $("#fam").val();
  var ind = localStorage.getItem("ind");
  webSocket.send(
    JSON.stringify({
      username: userdata[ind]["username"],
      password: userdata[ind]["password"],
      "First Name": fname,
      "Last Name": lname,
      Age: age,
      Profession: pro,
      "Family Members": fam,
    })
  );
});
$("#cancelBtn").click(() => {
  $("#fname").val("");
  $("#lname").val("");
  $("#age").val("");
  $("#pro").val("");
  $("#fam").val("");
});
