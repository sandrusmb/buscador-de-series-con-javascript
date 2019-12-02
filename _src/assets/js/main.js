"use strict";

//Voy a buscar el ul del listado de pelis

const movieList = document.querySelector(".movie__list");

//función para pintar una card: meter lis dentro del ul y sustituir los datos fakes por la "ruta" de los data verdaderos

function paintCard(movie) {
  movieList.innerHTML += `<li class="movie__list__item"><h2>${movie.show.name}</h2><img src="${movie.show.image.medium}" alt="${movie.show.name}" /></li>`;
}

//llamar a la función con una peli en concreto para ver si funciona
paintCard(data[5]);

//función pintar todas las cards. Recorrer el array con un for poniendo por parámetros el array que recibiré cuando sea.

function paintAllCards(moviesArray) {
  for (i = 0; i < moviesArray.length; i++) {
    paintCard(moviesArray[i]);
  }
}

//llamo a la función y pruebo con el array data de verdad
paintAllCards(data);
