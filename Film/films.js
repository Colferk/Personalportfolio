import { films } from "../data/films.js";
import { getLastNumber } from "../utils/index.js";

let filmList = document.querySelector("#filmList");

for (let i = 0; i < films.length; i++) {
  let figure = document.createElement("figure");
  let figImg = document.createElement("img");
  figImg.src = `https://starwars-visualguide.com/assets/img/films/${i + 1}.jpg`;
  let figCaption = document.createElement("figcaption");

  const foundFilm = films.find((film) => {
    const convertedString = parseInt(getLastNumber(film.url), 10);
    return convertedString === i + 1;
  });

  console.log(foundFilm);

  figCaption.textContent = foundFilm.title;

  figure.appendChild(figImg);
  figure.appendChild(figCaption);
  filmList.appendChild(figure);
}