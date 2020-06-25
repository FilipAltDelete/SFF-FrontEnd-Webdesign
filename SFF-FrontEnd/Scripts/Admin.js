printAdminFunctions();

function printAdminFunctions() {
  if (localStorage.getItem("userId") === "Admin") {
    document.getElementById("adminDiv").innerHTML =
      "<button onclick='addNewMovieButton()'>Add New Movie</button>" +
      "<button onclick='rentedMovies()'>Show Rented Movies</button>" +
      "<button onclick='showStudios()'>Verify User</button>";
  } else {
    fetch("https://localhost:5001/api/RentedFilm")
      .then((response) => response.json())
      .then((data) => getRentedMovies(data));

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
  }
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
      var returnStockData = {
        id: json.id,
        name: json.name,
        stock: json.stock,
      };
      fetch("https://localhost:5001/api/Film/" + selectedMovieId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(returnStockData),
      }).then((response) => response.json());
    });
}
function addNewMovieButton() {
  document.getElementById("rentedMovies").innerHTML =
    "<br><input type='text' id='movieName' placeholder='movie' /> <input type='number' id='stock' placeholder='stock' /><br><input type='button' id='addMovie' onclick='getNewMovieValues()' value='Add Movie'></input>";
}

function getNewMovieValues() {
  var newMovieName = document.getElementById("movieName").value;
  var newMovieStock = parseInt(document.getElementById("stock").value);
  console.log("elementValue: " + newMovieName);
  console.log("elementValue: " + newMovieStock);

  var Film = {
    Name: newMovieName,
    Stock: newMovieStock,
  };

  const data = JSON.stringify(Film);
  console.log("Json.stringify:   " + data);
  //postNewMovie(Film);

  console.log(newMovieName);
  console.log(newMovieStock);
  fetch("https://localhost:5001/api/Film", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Name: newMovieName,
      Stock: newMovieStock,
    }),
  })
    .then((response) => {
      response.json();
      console.log(response);
    })
    .then((data) => {
      console.log("Success:  " + data);
    });
}

function verifyStudio(studioId) {
  console.log(studioId);

  var studioDTO;

  fetch("https://localhost:5001/api/FilmStudio/" + studioId)
    .then(function (response) {
      return response.json();
    })
    .then(function (studio) {
      studioDTO = studio;
      console.log(studioDTO);

      var studioVerified = {
        id: studioDTO.id,
        name: studioDTO.name,
        password: studioDTO.password,
        verified: true,
      };
      console.log(studioVerified);
      fetch("https://localhost:5001/api/FilmStudio/" + studio.id, {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(studioVerified),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    });
}

function showStudios() {
  var unverifiedStudios = new Array();

  fetch("https://localhost:5001/api/FilmStudio")
    .then(function (response) {
      return response.json();
    })
    .then(function (studios) {
      studios.forEach((element) => {
        if (element.verified === false) {
          unverifiedStudios.push(element);
        }
      });
      printStudios(unverifiedStudios);
    });
}

function printStudios(unverifiedStudios) {
  document.getElementById("rentedMovies").innerHTML = "";
  console.log(unverifiedStudios);

  unverifiedStudios.forEach((element) => {
    var newDiv = document.createElement("div");
    newDiv.className = "rentedMovieColumn";
    newDiv.innerHTML =
      "ID: " +
      element.id +
      "</br>Studio: " +
      element.name +
      "</br></br>" +
      "<button onclick='verifyStudio(" +
      element.id +
      ")'>Verify</button>";
    var containerDiv = document.getElementById("rentedMovies");
    containerDiv.appendChild(newDiv);
  });
}

function rentedMovies() {
  if (localStorage.getItem("userId") === "Admin") {
    fetch("https://localhost:5001/api/RentedFilm")
      .then((response) => response.json())
      .then((data) => getRentedMovies(data));
  }
}

function getRentedMovies(rentedData) {
  var rentedMovieArray = new Array();
  rentedData.forEach((element) => {
    rentedMovieArray.push(element);
  });

  var moviesFromDB = new Array();
  fetch("https://localhost:5001/api/Film")
    .then(function (response) {
      return response.json();
    })
    .then(function (movies) {
      rentedMovieArray.forEach((rentedMovie) => {
        movies.forEach((movie) => {
          if (rentedMovie.filmId == movie.id) {
            var rentedMovies = {
              id: movie.id,
              name: movie.name,
              studio: rentedMovie.studioId,
            };

            moviesFromDB.push(rentedMovies);
          }
        });
      });

      printRentedMovies(moviesFromDB);
    });
}

function printRentedMovies(moviesFromDB) {
  document.getElementById("rentedMovies").innerHTML = "";
  console.log(moviesFromDB);

  moviesFromDB.forEach((element) => {
    var newDiv = document.createElement("div");
    newDiv.className = "rentedMovieColumn";
    newDiv.innerHTML =
      "ID: " +
      element.id +
      "<br>Title:  " +
      element.name +
      "<br>StudioId: " +
      element.studio +
      "<br/> <a onclick='onMovieClicked(" +
      element.id +
      ")'><img style='height: 100px; widht: 100px' src='Images/StockMovieImg.jpg'><a/>" +
      "<br></br>";
    var containerDiv = document.getElementById("rentedMovies");
    containerDiv.appendChild(newDiv);
  });
}
