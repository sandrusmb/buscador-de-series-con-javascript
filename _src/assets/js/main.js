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

//función para pintar una card: meter lis dentro del ul y sustituir los datos fakes por la "ruta" de los data verdaderos
/* function paintCard(movie) {
  movieList.innerHTML += `<li class="movie__list__item" id=""><h2 class="movie__list__item__title">${movie.show.name}</h2><img class="movie__list__item__img" src="${movie.show.image.medium}" alt="${movie.show.name}" /></li>`;
} */

getFavsFromLocalStorage();

function paintCard(movie) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  const img = document.createElement("img");
  li.classList.add("movie__list__item");
  li.setAttribute("data-id", movie.show.id);
  p.classList.add("movie__list__item__title");
  img.classList.add("movie__list__item__img");
  p.innerHTML = movie.show.name;
  img.src = getImageSrc(movie);
  img.alt = movie.show.name;
  li.appendChild(p);
  li.appendChild(img);
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
      deleteAllCards();
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
  //TODO: ir a buscar la movie. ¿De dónde la saco? ¿De dónde saco el id?
  const movie = searchInSaveDataById(id);
  if (li.classList.contains("js-fav")) {
    deleteMovieFromFav(movie);
  } else {
    addMovieToFav(movie);
  }
  li.classList.toggle("js-fav");
  deleteAllFavCards();
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
  for (let i = 0; i < movieArray.length; i++) {
    paintFavCard(movieArray[i]);
  }
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

// borrar de la lista de favoritos. mirar el id de la peli que quiero quitar y hacer delete.

function deleteMovieFromFav(movieToDelete) {
  favData.splice(favData.indexOf(movieToDelete), 1);
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
