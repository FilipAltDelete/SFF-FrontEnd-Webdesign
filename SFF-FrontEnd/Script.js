console.log("† Jesus Kristus, vår frälsare †");
console.log(localStorage.getItem("userId"));

var getUser = "";
var getPass = "";

var loginPage = document.getElementById("loginContent");
var mainPage = document.getElementById("mainPageContent");

if (localStorage.getItem("userId") != null) {
  showWelcomePage(getUser);
} else {
  showLoginPage();
}

function showLoginPage() {
  loginPage.innerHTML =
    "<input type='text' id='username' value='Name' /> <input type='password' id='userPassword' value='Password' /><input  id='loginUser' type='submit' value='Login'></input>";
  mainPage.innerHTML = "SFF!";

  var logginButton = document.getElementById("loginUser");
  logginButton.addEventListener("click", function () {
    getUser = document.getElementById("username").value;
    getPass = document.getElementById("userPassword").value;

    fetch("https://localhost:5001/api/FilmStudio")
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        console.log(json);

        for (let i = 0; i < json.length; i++) {
          if (getUser == json[i].name && getPass == json[i].password) {
            console.log("Rätt");
            localStorage.setItem("userId", i);
          }
        }

        if (localStorage.getItem("userId") != null) {
          showWelcomePage(getUser);
        } else {
          showErrorPage();
        }
      });
  });
}

function showWelcomePage(getUser) {
  loginPage.innerHTML = "<button id='signout'>Logout</button>";
  //mainPage.innerHTML = "Welcome " + getUser;

  var print = "Welcome ";

  fetch("https://localhost:5001/api/FilmStudio")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      print = print + json[localStorage.getItem("userId")].name;
      mainPage.innerHTML = print;
    });

  var logoutButton = document.getElementById("signout");

  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("userId");
    showLoginPage();
  });
}

function showErrorPage() {
  mainPage.innerHTML = "<div>Password was wrong!</div>";
}
