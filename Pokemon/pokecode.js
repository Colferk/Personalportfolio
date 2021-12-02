async function getAPIData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

getAPIData("https://pokeapi.co/api/v2/pokemon/absol").then((data) => {
  console.log(data);
  populatePokeCards(data);
});

const pokeGrid = document.querySelector(".pokeGrid");

function populatePokeCards(singlePokemon) {
  const pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  const pokeCard = document.createElement("div");
  pokeCard.className = "card";
  pokeCard.addEventListener("click", () =>
    pokeCard.classList.toggle("is-flipped")
  );

  
  const front = populateCardFront(singlePokemon);
  const pokeBack = document.createElement("div");
  pokeBack.className = "cardFace back";
  pokeBack.textContent = "Back";

  pokeCard.appendChild(pokeFront);
  pokeCard.appendChild(pokeBack);
  pokeScene.appendChild(pokeCard);
  pokeGrid.appendChild(pokeScene);
}

function populateCardFront(pokemon) {
  const pokeFront = document.createElement("figure");
  pokeFront.className = "cardFace front";
  const pokeImg = document.createElement("img");
  //pokeImg.src = "url here"
  const pokeCaption = document.createElement("figCaption");
  pokeCaption.textContent = pokemon.name;
  pokeFront.appendChild(pokeImg)
  pokeFront.appendChild(pokeCaption)
  return pokeFront;
}
