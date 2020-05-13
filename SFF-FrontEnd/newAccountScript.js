var newUser = "";
var newPW = "";
var verifiedPW = "";

function createNewStudio() {
  var newStudio = document.getElementById("newUsername").value;
  var newPW = document.getElementById("newPassword").value;
  var newVerifiedPW = document.getElementById("newVerifiedPassword").value;

  if (newPW == newVerifiedPW) {
    console.log("if-statment true!");
    var jsonObject = {
      Name: newStudio,
      Password: newPW,
      Verified: false,
    };

    const data = JSON.stringify(jsonObject);
    postNewStudio(data);
  } else {
    console.log("if false!!");
  }
}

async function postNewStudio(data) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.responseText);
    }
  };
  xhttp.open("POST", "https://localhost:5001/api/FilmStudio", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(data);
}
