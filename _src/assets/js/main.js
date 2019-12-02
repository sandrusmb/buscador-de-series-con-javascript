"use strict";

import { link } from "fs";

//creo el array donde voy a guardar las búsquedas en mi api
let savedData = [];
let imageDefault = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";

//Voy a buscar el ul del listado de pelis
const movieList = document.querySelector(".movie__list");
//voy a por el input
const input = document.querySelector(".container__form__input");
//voy a por el img
const img = document.querySelector(".movie__list__item__img");

//función para pintar una card: meter lis dentro del ul y sustituir los datos fakes por la "ruta" de los data verdaderos
function paintCard(movie) {
  movieList.innerHTML += `<li class="movie__list__item" id=""><h2 class="movie__list__item__title">${movie.show.name}</h2><img class="movie__list__item__img" src="${movie.show.image.medium}" alt="${movie.show.name}" /></li>`;
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
