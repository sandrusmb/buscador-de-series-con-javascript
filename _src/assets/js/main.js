"use strict";

//creo el array donde voy a guardar las búsquedas en mi api
let savedData = [];
let favData = [];
let imageDefault = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";

//Voy a buscar el ul del listado de pelis
const movieList = document.querySelector(".movie__list");
const favList = document.querySelector(".aside__list");
//voy a por el input
const input = document.querySelector(".container__form__input");
//voy a por el img
const img = document.querySelector(".movie__list__item__img");

getFavsFromLocalStorage();

//función para pintar una card

function paintCard(movie) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  const img = document.createElement("img");
  const pSchedule = document.createElement("p");
  li.classList.add("movie__list__item");
  pSchedule.classList.add("movie__list__item__schedule");
  if (searchInFavDataById(movie.show.id) !== undefined) {
    li.classList.add("js-fav");
  }
  li.setAttribute("data-id", movie.show.id);
  p.classList.add("movie__list__item__title");
  img.classList.add("movie__list__item__img");
  p.innerHTML = movie.show.name;
  pSchedule.innerHTML = movie.show.schedule.time;
  img.src = getImageSrc(movie);
  img.alt = movie.show.name;
  li.appendChild(p);
  li.appendChild(img);
  li.appendChild(pSchedule);
  // evento sobre el li para pintar fav
  li.addEventListener("click", liClickHandler);
  movieList.appendChild(li);
}

function getImageSrc(movie) {
  let src = "";
  if (movie.show.image === null) {
    src = imageDefault;
  } else {
    src = movie.show.image.medium;
  }
  return src;
}

//llamar a la función con una peli en concreto para ver si funciona
//paintCard(data[1]);

//función pintar todas las cards. Recorrer el array con un for poniendo por parámetros el array que recibiré cuando sea.

function paintAllCards(moviesArray) {
  deleteAllCards();
  for (i = 0; i < moviesArray.length; i++) {
    paintCard(moviesArray[i]);
  }
}

//llamo a la función y pruebo con el array data de verdad
//paintAllCards(data);

//Borrar las cards

function deleteAllCards() {
  movieList.innerHTML = "";
}

//fetch

function getDataFromServer() {
  fetch(`http://api.tvmaze.com/search/shows?q=${input.value}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      paintAllCards(data);
      savedData = data;
    });
}

//escuchar al botón

const searchButton = document.querySelector(".container__form__button");

function searchButtonHandler(event) {
  event.preventDefault();
  //hacer el fetch
  getDataFromServer();
}

searchButton.addEventListener("click", searchButtonHandler);

// Cambiar de color de la tarjeta cuando es seleccionada. Escuchar el evento.

const movie = document.querySelector(".movie__list__item");

// evento de favorito

function liClickHandler(event) {
  const li = event.currentTarget;
  const id = li.getAttribute("data-id");
  if (searchInFavDataById(id) !== undefined) {
    deleteMovieFromFav(id);
  } else {
    const movie = searchInSaveDataById(id);
    addMovieToFav(movie);
  }
  deleteAllFavCards();
  paintAllCards(savedData);
  paintFavAllCards(favData);
  saveFavInLocalStorage();
}

// función que pinta la card de favoritos

function paintFavCard(movie) {
  const li = document.createElement("li");
  const img = document.createElement("img");
  const p = document.createElement("p");
  const div = document.createElement("div");
  li.classList.add("aside__list__item");
  img.classList.add("aside__list__item__img");
  p.classList.add("aside__list__item__title");
  p.innerHTML = movie.show.name;
  div.classList.add("aside__list__item__delete");
  div.innerHTML = "x";
  div.setAttribute("data-id", movie.show.id);
  img.src = getImageSrc(movie);
  img.alt = movie.show.name;
  li.appendChild(img);
  li.appendChild(p);
  li.appendChild(div);
  favList.appendChild(li);
}

//paintFavCard(data[4]);
//paintFavCard(data[3]);
//paintFavCard(data[2]);

// función de pintar todas las cards de fav

function paintFavAllCards(movieArray) {
  deleteAllFavCards();
  for (let i = 0; i < movieArray.length; i++) {
    paintFavCard(movieArray[i]);
  }
  divListener();
}

paintFavAllCards(favData);

// queremos que al clicar en una card se añada a favData el objeto de la movie correspondiente a la tarjeta a la que he cliclado

function addMovieToFav(movie) {
  favData.push(movie);
}

// función que sabe buscar una pelicula en el saveData y me la devuelva

function searchInSaveDataById(idToSearch) {
  for (let i = 0; i < savedData.length; i++) {
    const movie = savedData[i];
    if (movie.show.id === parseInt(idToSearch)) {
      return movie;
    }
  }
}

function searchInFavDataById(idToSearch) {
  for (let i = 0; i < favData.length; i++) {
    const movie = favData[i];
    if (movie.show.id === parseInt(idToSearch)) {
      return movie;
    }
  }
}

// borrar de la lista de favoritos. mirar el id de la peli que quiero quitar y hacer delete.

function deleteMovieFromFav(movieIdToDelete) {
  for (let i = 0; i < favData.length; i++) {
    if (favData[i].show.id === parseInt(movieIdToDelete)) {
      favData.splice(i, 1);
    }
  }
}

// borrar tarjetas de favoritos

function deleteAllFavCards() {
  favList.innerHTML = "";
}

// localstorage

function saveFavInLocalStorage() {
  localStorage.setItem("myFavs", JSON.stringify(favData));
}

function getFavsFromLocalStorage() {
  favData = JSON.parse(localStorage.getItem("myFavs"));
  if (favData === null) {
    favData = [];
  }
}

// mirar si cuando busque, hay alguna tarjeta marcada como fav. Hacer un searchInSaveDataById pero del favData que devuelva true (que me lo pinte de rojo >> poner la clase) or false.

// cuando demos (hacer el listener) a la x de los fav, que me lo borre del array de favData. Por tanto, repintar favs. Poner un data-id también en los li de aside(fav). Meto el id cuando se pinta la tarjeta y lo busco cuando se produce el clic.(usar el setAttribute, getAttribute, currentTarget,parentElement).

//Cuando le de a la x, que se despinte la card y que se ponga rosa.

//¡¡¡¡¡¡¡¡¡¡¡¡¡¡REVISAR CON MIGUEL!!!!!!!!!!!!!
function divListener() {
  const div = document.querySelectorAll(".aside__list__item__delete");

  for (let i = 0; i < div.length; i++) {
    div[i].addEventListener("click", liClickHandler);
  }
}

//divClickhandler()

const examButton = document.querySelector(".container__form__exam");

function examButtonClickHandler(event) {
  event.preventDefault();
  console.log("hola");
  for (let i = 0; i < savedData.length; i++) {
    console.log(savedData[i].show.name);
  }
}

examButton.addEventListener("click", examButtonClickHandler);
