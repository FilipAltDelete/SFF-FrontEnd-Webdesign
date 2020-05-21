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
    '<button id="rentButton" class="rentButton" onclick="rentMovie()">Rent</button><br><br/><button id="addTrivia" class="triviaButton" onclick="addTrivia()">Add Trivia</button>';
}

function rentMovie() {
  var movieId = parseInt(localStorage.getItem("MovieId"));
  var studio = parseInt(localStorage.getItem("userId")) + 1;
  //var movieToRent
  fetch("https://localhost:5001/api/Film/" + movieId)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      if (json.stock == 0) {
        console.log("out of stock");
      } else {
        var data = { filmId: movieId, studioId: studio };
        fetch("https://localhost:5001/api/RentedFilm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });

        json.stock--;
        var movieStock = { id: json.id, name: json.name, stock: json.stock };
        fetch("https://localhost:5001/api/Film/" + movieId, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movieStock),
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
          });
      }
    });
}

function addTrivia() {
  document.getElementById("triviaTextBox").innerHTML =
    "<textarea id='triviaBox' rows='10' cols='50'></textarea><br><br><input type='submit' class='triviaButton' id='triviaSubmit' value='Send Trivia' onclick='postTrivia()'></input>";
}
function postTrivia() {
  var newTrivia = document.getElementById("triviaBox").value;
  var movieId = parseInt(localStorage.getItem("MovieId"));
  if (newTrivia != null) {
    var data = { filmid: movieId, trivia: newTrivia };

    fetch("https://localhost:5001/api/FilmTrivia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }
  document.getElementById("triviaTextBox").innerHTML = "";
}

function getTrivia(triviaData) {
  document.getElementById("movieTrivia").innerHTML = "";
  var movieTriviaArr = new Array();
  var movieId = localStorage.getItem("MovieId");
  triviaData.forEach((element) => {
    if (element.filmId == movieId) {
      console.log(element);
      movieTriviaArr.push(element);
    }
  });
  printTrivia(movieTriviaArr);
}
function printTrivia(triviaArr) {
  document.getElementById("movieTrivia").innerHTML = "";
  triviaArr.forEach((element) => {
    var newDiv = document.createElement("div");
    newDiv.className = "newTriviaDiv";
    newDiv.innerHTML = "<br/><br/>Trivia: <br/>" + element.trivia;
    var containerDiv = document.getElementById("movieTrivia");
    containerDiv.appendChild(newDiv);
  });
}

fetch("https://localhost:5001/api/Film")
  .then((response) => response.json())
  .then((data) => buildList(data));

fetch("https://localhost:5001/api/FilmTrivia/")
  .then((response) => response.json())
  .then((data) => getTrivia(data));
