var moviePage = document.getElementById("moviePageContent");

function updateList() {
  getDataAsync("https://localhost:5001/api/Film").then((data) =>
    buildList(data)
  );
}

async function getDataAsync(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

function buildList(data) {
  document.getElementById("moviePageContent").innerHTML = "";
  data.forEach((element) => {
    var newDiv = document.createElement("div");
    newDiv.className = "movieColumn";
    newDiv.innerHTML =
      "ID: " +
      element.id +
      "<br>Title:  " +
      "<a onclick='onMovieClicked()'>" +
      element.name +
      "<a/>" +
      "<br/> In Stock:   " +
      element.stock +
      "<br/> <a onclick='onMovieClicked(" +
      element.id +
      ")'><img class='titleLinq' style='height: 100px; widht: 100px' src='Images/StockMovieImg.jpg'><a/>";
    console.log(element.name);
    var containerDiv = document.getElementById("moviePageContent");
    containerDiv.appendChild(newDiv);
  });
}

function onMovieClicked(movieid) {
  getDataAsync("https://localhost:5001/api/Film").then((data) =>
    redirectPage(data, movieid)
  );
}

function redirectPage(data, movieid) {
  localStorage.setItem("MovieId", movieid);
  window.location.href = "SpecificMovie.html";
}

fetch("https://localhost:5001/api/Film")
  .then((response) => response.json())
  .then((data) => buildList(data));
