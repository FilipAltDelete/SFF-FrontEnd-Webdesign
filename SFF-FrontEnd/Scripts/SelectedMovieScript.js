async function getDataAsync(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

function buildList(data) {
  var selectedMovie = localStorage.getItem("MovieId");
  console.log(selectedMovie);

  data.forEach((element) => {
    if (element.id == selectedMovie) {
      document.getElementById("selectedMovieDiv").innerHTML =
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
    }
  });
}

fetch("https://localhost:5001/api/Film")
  .then((response) => response.json())
  .then((data) => buildList(data));
