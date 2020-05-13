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

fetch("https://localhost:5001/api/Film")
  .then((response) => response.json())
  .then((data) => buildList(data));
