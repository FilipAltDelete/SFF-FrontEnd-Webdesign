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
    var img = document.createElement("img");
    img.src = "Images/StockMovieImg.jpg";
    var newDiv = document.createElement("div");
    newDiv.className = "movieColumn";
    newDiv.innerHTML =
      "Title:  " +
      element.name +
      "<br/> In Stock:   " +
      element.stock +
      "<br/> <img class='titleLinq' style='height: 100px; widht: 100px' src='Images/StockMovieImg.jpg'>";
    newDiv.img = img;
    console.log(element.name);
    var containerDiv = document.getElementById("moviePageContent");
    containerDiv.appendChild(newDiv);
  });
}
/*

function buildList(data) {
  document.getElementById("moviePageContent").innerHTML = "";
  data.forEach((element) => {
    var img = document.createElement("img");
    img.src = "/Images/StockMovieImg.jpg";
  });
}
*/

fetch("https://localhost:5001/api/Film")
  .then((response) => response.json())
  .then((data) => buildList(data));

/*
function printMovies() {
  var printTitle = "Movie title: ";
  var printStock = "In Stock: ";
  var printImage;

  fetch("https://localhost:5001/api/Film")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      for (let i = 0; i < json.length; i++) {
        printTitle = printTitle + json.name;
        moviePage.innerHTML = printTitle;
      }
    });
}
*/
