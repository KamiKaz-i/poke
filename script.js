import { displayPokemonCards, pokemons, handlePokemonClick, handleSearch, handleShowFavourites } from "./UIpokemons.js";

displayPokemonCards(pokemons);

const section = document.querySelector('.pokemons');
section.addEventListener('click', handlePokemonClick)



const searchBar = document.querySelector('.searchBar')
searchBar.addEventListener('input', handleSearch);

const favouriteButton = document.querySelector('.favouriteButton');
favouriteButton.addEventListener('click', handleShowFavourites);
