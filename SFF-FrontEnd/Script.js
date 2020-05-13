console.log("† Jesus Kristus, vår frälsare †");
console.log(localStorage.getItem("userId"));

var user = "Jesus";
var pass = "123";
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

    if (getUser == user && getPass == pass) {
      console.log("Ja det stämmer");

      localStorage.setItem("userId", getUser);
      console.log(localStorage.getItem("userId"));

      showWelcomePage(getUser);
    } else {
      console.log("nej, fel");
      showErrorPage();
    }
  });
}

function showWelcomePage(getUser) {
  loginPage.innerHTML = "<button id='signout'>Logout</button>";
  mainPage.innerHTML = "Welcome " + getUser;
  var logoutButton = document.getElementById("signout");

  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("userId");
    showLoginPage();
  });
}

function showErrorPage() {
  mainPage.innerHTML = "<div>Password was wrong!</div>";
}
