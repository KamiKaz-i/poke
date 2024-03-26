import { favouritesShowed, displayPokemonCards, aside } from "./UIpokemons.js";

export let favouritesPokemons = [];

export function addToFavourites(selectedPokemon){
  if(!isInFavourites(selectedPokemon)){
    favouritesPokemons.push(selectedPokemon);
  }
  else{
    removeFromFavourites(selectedPokemon);
  }
}

function isInFavourites(pokemon){
  return favouritesPokemons.some((poke) => JSON.stringify(poke) === JSON.stringify(pokemon))
}

function removeFromFavourites(pokemon){
  if(isInFavourites(pokemon)){
    favouritesPokemons=favouritesPokemons.filter((poke) => poke.pokemonName !== pokemon.pokemonName);

    if(favouritesShowed){
      displayPokemonCards(favouritesPokemons)
    }
    aside.innerHTML = "";
  }
}