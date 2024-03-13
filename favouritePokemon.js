import { favouritesShowed,removeFavouriteFromUi } from "./UIpokemons.js";
export let favouritesPokemons=[];

export function isInFavourites(pokemon){
    return favouritesPokemons.some((poke)=>JSON.stringify(poke)===JSON.stringify(pokemon))
}

export function addToFavourites(pokemon){
    if(!isInFavourites(pokemon)){
        favouritesPokemons.push(pokemon);
    }
    else{
        RemoveFromFavourites(pokemon);
    }
}

export function RemoveFromFavourites(pokemon){
    
    if(isInFavourites(pokemon)){
        favouritesPokemons=favouritesPokemons.filter((poke)=>poke.pokemonName!==pokemon.pokemonName);
        if(favouritesShowed){
           
            removeFavouriteFromUi(pokemon);
        }
        
        
    }
}