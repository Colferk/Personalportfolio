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
  console.log;
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}$offset=${offset}`
  ).then(async (data) => {
    console.log(data);
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) =>
        populatePokeCards(pokeData)
      );
    }
  });
}

function pokemonName(name = "") {
  let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  removeChildren(pokeGrid);
  getAPIData(url).then(async (data) => {
    console.log(data);
    await getAPIData(url).then((pokeData) => populatePokeCards(pokeData));
  });
}

const pokeGrid = document.querySelector(".pokeGrid");
const loadButton = document.querySelector(".loadPokemon");
loadButton.addEventListener("click", () => {
  removeChildren(pokeGrid);
  //let whatGen  = prompt('What Generation?')
  let howMany = prompt("How many pokemon to load?");
  loadPokemon(howMany);
});

const newButton = document.querySelector(".newPokemon");
newButton.addEventListener("click", () => {
  let pokeName = prompt("Name your Pokemon!");
  // let pokeHeight = prompt("Pokemons height.");
  // let pokeWeight = prompt("Pokemons weight in kg.");
  let poke_Types = prompt("Your pokemon type");
  let pokeAbilities = prompt(
    "Put your abilities (use a comma for more than one)"
  );
  let newPokemon = new Pokemon(
    pokeName,
    // pokeHeight,
    // pokeWeight,
    getTypesArray(poke_Types),
    getAbilitiesArray(pokeAbilities)
  );
  removeChildren(pokeGrid);
  populatePokeCards(newPokemon);
});

const morePokemon = document.querySelector(".morePokemon");

morePokemon.addEventListener("click", () => {
  let name = prompt("Choose your pokemon (enter name or ID)");
  pokemonName(name);
});

function getAbilitiesArray(commaString) {
  let tempArray = commaString.split(",");
  return tempArray.map((abilityName) => {
    return {
      ability: {
        name: abilityName,
      },
    };
  });
}

function getTypesArray(commaString) {
  let tempArray = commaString.split(",");
  return tempArray.map((typeName) => {
    return {
      type: {
        name: typeName,
      },
    };
  });
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
    pokeImg.src = "../Images/pokeball3.png";
  } else {
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  }
  const pokeCaption = document.createElement("figcaption");
  pokeCaption.textContent = pokemon.name;
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
  const abilityList = document.createElement("li");
  pokemon.abilities.forEach((abilityItem) => {
    let listItem = document.createElement("li");
    listItem.textContent = abilityItem.ability.name;
    abilityList.appendChild(listItem);
  });
  pokeBack.appendChild(abilityList);

  const pokeTypes = document.createElement("h4");
  pokeTypes.textContent = "Type:";
  pokeBack.appendChild(pokeTypes);
  pokemon.types.forEach((typeItem) => {
    let typeList = document.createElement("img");
    typeList.textContent = typeItem.type.name;
     let pokeTypeImg = new Image (60, 30);
    pokeTypeImg.src = getPokeTypeImg(typeList.textContent)

    pokeBack.appendChild(pokeTypeImg)
  });

  const pokePix = document.createElement("img");
  if (pokemon.id === 1000) {
    pokePix.src = "../Images/pokeball3.png";
  } else {
    pokePix.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    pokeBack.appendChild(pokePix)
  }
  

  return pokeBack;
}


class Pokemon {
  constructor(name, types, abilities) {
    (this.id = 1000),
      (this.name = name),
      // (this.height = height),
      // (this.weight = weight),
      (this.types = types),
      (this.abilities = abilities)
  }
}

function getPokeTypeImg(pokeType) {
let src
console.log(pokeType)
switch (pokeType) {

  case 'grass':
  src = '../Images/Types/Grass.png'
  break
  case 'fire':
  src = '../Images/Types/Fire.png'
  break
  case 'water':
  src = '../Images/Types/Water.png'
  break
  case 'bug':
  src = '../Images/Types/Bug.png'
  break
  case 'normal':
  src = '../Images/Types/Normal.png'
  break
  case 'flying':
  src = '../Images/Types/Flying.png'
  break
  case  'poison':
  src = '../Images/Types/Poison.png'
  break
  case 'electric':
  src = '../Images/Types/Electric.png'
  break
  case 'psychic':
  src = '../Images/Types/Psychic.png'
  break
  case 'ground':
  src = '../Images/Types/Ground.png'
  break
  case 'rock':
  src = '../Images/Types/Rock.png'
  break
  case 'dark':
  src = '../Images/Types/DarkI.png'
  break
  case 'dragon':
  src = '../Images/Types/Dragon.png'
  break
  case 'fairy':
  src = '../Images/Types/Fairy.png'
  break
  case 'fighting':
  src = '../Images/Types/Fighting.png'
  break
  case 'ghost':
  src = '../Images/Types/Ghost.png'
  break
  case 'ice':
  src = '../Images/Types/Ice.png'
  break
  case 'steel':
  src = '../Images/Types/Steel.png'
  break
  default:
    src = '../Images/Types/Normal.png'
}
return src
}