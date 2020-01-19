# Buscador de series

Este ejercicio corresponde a la evaluación final del módulo 2 de Adalab correspondiente a JavaScript. Consiste en desarrollar una aplicación web de búsqueda de series de TV, que nos permite des/marcar las series como favoritas y guardarlas en localStorage. >> http://beta.adalab.es/modulo-2-evaluacion-final-sandrusmb/

El ejercicio también tiene una parte de maquetación con HTML y SASS.

## La interfaz

Consta de:
- Un campo de texto y un botón para buscar series por su título.
- Un listado de resultados de búsqueda donde aparece el cartel de la serie y el título.
- Un apartado de favoritos

## La funcionalidad

Al hacer clic sobre el botón de Buscar, la aplicación se conecta al API abierto de TVMaze para búsqueda de series >> http://api.tvmaze.com/search/shows?q=
  
Para construir la URL de búsqueda se recoge el texto que ha introducido el usuario en el campo de búsqueda.

Por cada show contenido en el resultado de la búsqueda, se pinta una tarjeta donde mostramos una imagen de la serie y el título.

Algunas de las series que devuelve el API no tienen imagen. En ese caso, se muestra una imagen de relleno. 

## Favoritos

Una vez aparecen los resultados de búsqueda, el usuario puede indicar cuáles son sus series favoritas. Para ello, al hacer clic sobre una serie debe pasar lo siguiente:

- El color de fondo y el de fuente se intercambian, indicando que es una serie favorita.
- Se muestra un listado en la parte izquierda de la pantalla, debajo del formulario de búsqueda, con las series favoritas. 
- Las series favoritas deben seguir apareciendo a la izquierda aunque el usuario realice otra búsqueda.

## Almacenamiento local

El listado de favoritos se almacena en el localStorage. De esta forma, al recargar la página el listado de favoritos se debe mantener.
        
Al hacer clic sobre el icono de una 'x' al lado de cada favorito, hay que borrar el favorito clicado de la lista y del localStorage.

## El reto

- Realizar el ejercicio en un plazo de 12 horas.
- Usar una estructura adecuada de ficheros y carpetas para un proyecto web, y enlazar bien los distintos ficheros.
- Tener el código perfectamente indentado.
- Uso de control de versiones con ramas para manejar un proyecto de código.
- JavaScript básico
- Crear código JavaScript con sintaxis correcta y bien estructurado.
- Usar constantes / variables para almacenar información y re-asignar valores.
- Usar condicionales para ejecutar acciones distintas en función de una condición.
- Saber trabajar con listados de datos (arrays). 
- Usar funciones para estructurar el código.
- Saber modificar la información del DOM para añadir contenido dinámico.
- Saber escuchar eventos del DOM y actuar en consecuencia. 
- Peticiones AJAX y APIs
- Crear peticiones con fetch y promesas.
- Saber trabajar correctamente con la respuesta del servidor. 
- Gestionar información en formato JSON.
- Usar el localStorage para guardar información en el navegador.
- Usar inglés para nombres de variables, funciones, clases, mensajes de commit, nombres de ficheros. 

## Guía de inicio rápido

Necesitarás instalar [Node.js](https://nodejs.org/) y [Gulp](https://gulpjs.com) para trabajar con este Starter Kit, luego:

1. Descarga o clona el repositorio
2. Instala las dependencias locales con `npm install`
3. Arranca el kit con `gulp`
