if (localStorage.getItem("userId") !== "Admin") {
  fetch("https://localhost:5001/api/RentedFilm")
    .then((response) => response.json())
    .then((data) => getRentedMovies(data));
}

function getRentedMovies(rentedData) {
  var studio = parseInt(localStorage.getItem("userId")) + 1;
  var moviesFromDB = new Array();
  var rentedMovieArray = new Array();
  rentedData.forEach((element) => {
    if (element.studioId == studio) rentedMovieArray.push(element);
  });

  fetch("https://localhost:5001/api/Film")
    .then(function (response) {
      return response.json();
    })
    .then(function (movies) {
      rentedMovieArray.forEach((rentedMovie) => {
        movies.forEach((movie) => {
          if (rentedMovie.filmId == movie.id) {
            moviesFromDB.push(movie);
          }
        });
      });
      printRentedMovies(moviesFromDB);
    });
}

function printRentedMovies(moviesFromDB) {
  document.getElementById("rentedMovies").innerHTML = "";

  moviesFromDB.forEach((element) => {
    var newDiv = document.createElement("div");
    newDiv.className = "rentedMovieColumn";
    newDiv.innerHTML =
      "ID: " +
      element.id +
      "<br>Title:  " +
      element.name +
      "<br/> <a onclick='onMovieClicked(" +
      element.id +
      ")'><img style='height: 100px; widht: 100px' src='Images/StockMovieImg.jpg'><a/>" +
      '<br></br><button id="returnButton" class="returnButton" onclick="returnRentedMovie(' +
      element.id +
      ')" >Return</button>';
    var containerDiv = document.getElementById("rentedMovies");
    containerDiv.appendChild(newDiv);
  });
}

function returnRentedMovie(selectedMovieId) {
  var rentedMovies = new Array();
  var currentUser = parseInt(localStorage.getItem("userId")) + 1;
  fetch("https://localhost:5001/api/RentedFilm")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      var movieToRemove = new Array();
      console.log("ALL RENTED MOVIES: ");
      console.log(json);

      json.forEach((element) => {
        if (element.studioId == currentUser) {
          rentedMovies.push(element);
        }
      });
      rentedMovies.forEach((element) => {
        if (element.filmId == selectedMovieId) {
          movieToRemove.push(element);
          if (movieToRemove.length > 1) {
            movieToRemove.pop();
          }
        }
      });

      console.log("USER RENTED MOVIES: ");
      console.log(rentedMovies);
      var rentedMovieIdToRemove = movieToRemove[0].id;
      console.log("MOVIE TO RETURN: ");
      console.log(movieToRemove);
      console.log("RETURN MOVIE ID: ");
      console.log(rentedMovieIdToRemove);

      fetch("https://localhost:5001/api/RentedFilm/" + rentedMovieIdToRemove, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((response) => {
          return response;
        });
    });
  fetch("https://localhost:5001/api/Film/" + selectedMovieId)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      json.stock++;
      var returnStockData = { id: json.id, name: json.name, stock: json.stock };
      fetch("https://localhost:5001/api/Film/" + selectedMovieId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(returnStockData),
      }).then((response) => response.json());
    });

  /*
  fetch("https://localhost:5001/api/RentedFilm/" + movieId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (response) {
    return response.json();
  });
  */
}
