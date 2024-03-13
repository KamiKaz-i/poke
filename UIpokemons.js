import {getPokemonsData} from "./pokemonData.js";
import {createPokemonCard,createSeletedCard} from "./createPokemonCard.js";
import {addToFavourites,favouritesPokemons} from "./favouritePokemon.js";

export const pokemons=await getPokemonsData();
const section=document.querySelector('.pokemons');
const aside=document.querySelector('aside')


export let favouritesShowed=false;

export function displayPokemonCards(listOfPokemons){

    while(section.firstChild){
        section.removeChild(section.firstChild);
    }
    listOfPokemons.forEach((pokemon)=>{
        const pokemonCard=createPokemonCard(pokemon)
        section.appendChild(pokemonCard);
    })
}
function pokemonNameStartsWith(listOfPokemons,event){

    while(section.firstChild){
        section.removeChild(section.firstChild);
    }
    listOfPokemons.forEach((pokemon)=>{
        if(pokemon.pokemonName.startsWith(event.target.value)){
            const pokemonCard=createPokemonCard(pokemon);
            section.appendChild(pokemonCard);
        }
    })
}

export function displaySelectedPokemon(pokemon){

    
    while(aside.firstChild){
        aside.removeChild(aside.firstChild);
    }
    const selectedCard=createSeletedCard(pokemon);
    aside.appendChild(selectedCard);
    const favouriteButton=document.querySelector('.selectedPokemonFavouriteButton');
    const favouriteIcon=document.querySelector('.selectedPokemonFavouriteIcon');
    
    favouriteButton.addEventListener("click",()=>{
        if(favouritesPokemons.some((poke)=>poke.pokemonName==pokemon.pokemonName)){
            favouriteIcon.setAttribute("src","images/estar.svg")
        }
        else{
            favouriteIcon.setAttribute("src","images/star.svg")
        }
        addToFavourites(pokemon)
    });
}   

export function handlePokemonClick(event){

    const clickedPokemon=event.target.closest('.pokemonCard');
    if(clickedPokemon){
        const pokemonName=clickedPokemon.childNodes[0].textContent;

        for(const pokemon of pokemons){
            if(pokemon.pokemonName===pokemonName){
                displaySelectedPokemon(pokemon)
            }
        }
    }
}

export function handleSearch(event){
    
    if(favouritesShowed==false){
        if(event.target.value!==""){
            pokemonNameStartsWith(pokemons,event);
        }
        else{
            displayPokemonCards(pokemons);
        }
    }
    else{
        if(event.target.value!==""){
            pokemonNameStartsWith(favouritesPokemons,event);
        }
        
        else{
            displayPokemonCards(favouritesPokemons);
        }
    }
    
}

export function handleShowFavourites(){
    const searchBar=document.querySelector('.searchBar')
    searchBar.value='';
    while(aside.firstChild){
        aside.removeChild(aside.firstChild);
    }
    if(favouritesShowed==false){
        displayPokemonCards(favouritesPokemons);
        favouritesShowed=true;
    }
    else{
        displayPokemonCards(pokemons);
        favouritesShowed=false;
    }
    
}

export function removeFavouriteFromUi(pokemon){

    section.childNodes.forEach((node)=>{
        if(node.textContent===pokemon.pokemonName){
            section.removeChild(node);
        }
    })
    while(aside.firstChild){
        aside.removeChild(aside.firstChild);
    }
}
