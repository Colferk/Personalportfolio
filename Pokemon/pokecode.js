import { removeChildren } from "../utils/index.js";
function getAPIData(url) {
  try {
    return fetch(url).then((data) => data.json());
  } catch (error) {
    console.error(error);
  }
}

function loadPokemon(limit = 30, offset = 100) {
  removeChildren(pokeGrid);
  console.log
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}$offset=${offset}`
  ).then(async (data) => {
    console.log(data.results)
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) =>
        populatePokeCards(pokeData)
      );
    }
  });
}

function pokemonName(name ="", limit = 1) {
  let url=`https://pokeapi.co/api/v2/pokemon/${name}`
  removeChildren(pokeGrid);
  getAPIData(
    url
  ).then(async (data) => {
    console.log(data)
      await getAPIData(url).then((pokeData) =>
        populatePokeCards(pokeData)
      );
  });
}

const pokeGrid = document.querySelector(".pokeGrid");
const loadButton = document.querySelector(".loadPokemon");
loadButton.addEventListener("click", () => {
  removeChildren(pokeGrid)
  let howMany = prompt('How many pokemon to load?')
  loadPokemon(howMany)
})

const newButton = document.querySelector(".newPokemon");
newButton.addEventListener("click", () => {
  let pokeName = prompt("Name your Pokemon!");
  let pokeHeight = prompt("Pokemons height.");
  let pokeWeight = prompt('Pokemons weight in kg.')
  let pokeAbilities = prompt(
    "Put your abilitiies (use a comma for more than one)"
  );
  let newPokemon = new Pokemon(pokeName, pokeHeight, pokeWeight, getAbilitiesArray(pokeAbilities));
  removeChildren(pokeGrid)
  populatePokeCards(newPokemon)
});

const morePokemon = document.querySelector('.morePokemon')

morePokemon.addEventListener('click', () => {
  let name = prompt('Choose your pokemon (enter name)')
  pokemonName(name)
})

function getAbilitiesArray(commaString) {
  let tempArray = commaString.split(',')
  return tempArray.map((abilityName) => {
    return {
      ability: {
        name: abilityName,
      },
    }
  })
}

function populatePokeCards(singlePokemon) {
  const pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  const pokeCard = document.createElement("div");
  pokeCard.className = "card";
  pokeCard.addEventListener("click", () =>
    pokeCard.classList.toggle("is-flipped")
  );

  const front = populateCardFront(singlePokemon);
  const back = populateCardBack(singlePokemon);

  pokeCard.appendChild(front);
  pokeCard.appendChild(back);
  pokeScene.appendChild(pokeCard);
  pokeGrid.appendChild(pokeScene);
}

function populateCardFront(pokemon) {
  const pokeFront = document.createElement("figure");
  pokeFront.className = "cardFace front";
  const pokeImg = document.createElement("img");
  if (pokemon.id === 1000) {
    pokeImg.src = '../Images/pokeball3.png'
  } else {
   pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  }
  const pokeCaption = document.createElement("figcaption");
  pokeCaption.textContent = pokemon.name
  pokeFront.appendChild(pokeImg);
  pokeFront.appendChild(pokeCaption);
  return pokeFront;
}

function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div");
  pokeBack.className = "cardFace back";

  const label = document.createElement("h4");
  label.textContent = "Abilities:";
  pokeBack.appendChild(label);
  const abilityList = document.createElement("ul");
  pokemon.abilities.forEach((abilityItem) => {
    let listItem = document.createElement("li");
    listItem.textContent = abilityItem.ability.name;
    abilityList.appendChild(listItem);

  
});
   pokeBack.appendChild(abilityList);

  const pokeTypes = document.createElement("h4")
  pokeTypes.textContent = "Type"
  const allTypes = document.createElement("ul")
  pokemon.types.forEach((typeItem) => {
    let typeList = document.createElement('li')
    typeList.textContent =typeItem.type.name;
    pokeTypes.appendChild(typeList)
    console.log(pokemon.types)
  })
 
  pokeBack.appendChild(pokeTypes);


  
  
  return pokeBack;
}

class Pokemon {
  constructor(name, height, weight, abilities) {
      (this.id = 1000),
      (this.name = name),
      (this.height = height),
      (this.weight = weight),
      (this.abilities = abilities);
  }
}
