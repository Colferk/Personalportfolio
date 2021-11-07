const mainContent = document.querySelector("#main");

import { people } from "../data/people.js";

import { getLastNumber, removeChildren } from "../utils/index.js";


const otherCharacters = people.filter((person) => {
  if (person.gender !== "male" && person.gender !== "female") {

    return person;
  }
});

const maleCharacters = people.filter((person) => person.gender === "male");

const femaleCharacters = people.filter((person) => person.gender === "female");


const header = document.createElement("header");

const maleButton = document.createElement("button");

maleButton.textContent = "Male Characters";

maleButton.addEventListener("click", () => populateDOM(maleCharacters));

const femaleButton = document.createElement("button");

femaleButton.textContent = "Female Characters";

femaleButton.addEventListener("click", () => populateDOM(femaleCharacters));

header.appendChild(maleButton);

header.appendChild(femaleButton);


document.body.insertBefore(header, mainContent);

function populateDOM(characters) {
  removeChildren(mainContent);
  characters.forEach((element) => {
    const charFigure = document.createElement("figure");
    const charImg = document.createElement("img");
    const charNum = getLastNumber(element.url);
    charImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`;

    const charCaption = document.createElement("figcaption");
    charCaption.textContent = element.name;

    charFigure.appendChild(charImg);
    charFigure.appendChild(charCaption);
    mainContent.appendChild(charFigure);
  });
}