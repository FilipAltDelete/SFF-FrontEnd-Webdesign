var navbar = document.getElementById("navBar");
var loginNavbar = document.getElementById("loginContent");

function showNavBar() {
  /*
  navbar.innerHTML =
    '<div class="topnav"><a href="/Index.html" class="active">Home</a><a href="/Movies.html">Movies</a> <a href="/CreateNewStudio.html">Create new account</a><a href="#about">-Placeholder-</a></div>';
*/
  navbar.insertAdjacentHTML(
    "afterbegin",
    '<div class="topnav"><a href="/Index.html" class="active">Home</a><a href="/Movies.html">Movies</a> <a href="/CreateNewStudio.html">Create new account</a><a href="#about">-Placeholder-</a></div>'
  );
}
