var navbar = document.getElementById("navBar");

if (localStorage.getItem("userId") != null) {
  showLogedInNavBar();
} else {
  showNavBar();
}

function showNavBar() {
  navbar.innerHTML =
    '<a href="/Index.html" class="active">Home</a><a href="/Movies.html">Movies</a><a href="/CreateNewStudio.html">Create new account</a><div id="loggedInStudio"></div><br /><div id="loginContent" style="color: aliceblue;"></div>';
}

function showLogedInNavBar() {
  navbar.innerHTML =
    '<a href="/Index.html" class="active">Home</a>' +
    '<a href="/Movies.html">Movies</a>' +
    '<div id="loggedInStudio"></div> ' +
    " <br />" +
    '<div id="loginContent" style="color: aliceblue;">' +
    "</div>";
}
