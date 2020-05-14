if (localStorage.getItem("userId") != null) {
  showButtons();
}

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

function showButtons() {
  document.getElementById("Buttons").innerHTML =
    '<button id="rentButton" class="rentButton">Rent</button><br></br><button id="returnButton" class="returnButton">Return</button><br></br><button id="addTrivia" class="triviaButton">Add Trivia</button>';
}

fetch("https://localhost:5001/api/Film")
  .then((response) => response.json())
  .then((data) => buildList(data));
