import {getPokemonsData} from "./pokemonData.js";
import {createPokemonCard,createSeletedCard} from "./createPokemonCard.js";
import {addToFavourites,favouritesPokemons} from "./favouritePokemon.js";

export const pokemons=await getPokemonsData();
export let favouritesShowed=false;

const next=document.querySelector('.next');
const previous=document.querySelector('.previous');
const allPokemons=document.querySelector('.pokemons');
const aside=document.querySelector('aside')

let currentPage=1;
const pokemonsPerPage=12;


next.addEventListener("click",()=>{
    
    if(favouritesShowed){
        if(currentPage<Math.ceil(favouritesPokemons.length/pokemonsPerPage)){
            currentPage+=1;
        }
        displayPokemonCards(favouritesPokemons);
    }
    else{
        if(currentPage<Math.ceil(200/pokemonsPerPage)){
            currentPage+=1;
        }
        displayPokemonCards(pokemons);
    }
    
})
previous.addEventListener("click",()=>{
    
    if(currentPage>1){
        currentPage-=1;
    }
    if(favouritesShowed){
        
        displayPokemonCards(favouritesPokemons);
    }
    else{
        
        displayPokemonCards(pokemons);
    }
    
})


export function displayPokemonCards(listOfPokemons){
    
    while(allPokemons.firstChild){
        allPokemons.removeChild(allPokemons.firstChild);
    }
    
    const start = (currentPage - 1) * pokemonsPerPage;
    const end = start + pokemonsPerPage;
    const pokemonsToDisplay = listOfPokemons.slice(start, end);
    
    pokemonsToDisplay.forEach((pokemon)=>{
        const pokemonCard=createPokemonCard(pokemon)
        allPokemons.appendChild(pokemonCard);
    })
}
function pokemonNameStartsWith(listOfPokemons,event){

    while(allPokemons.firstChild){
        allPokemons.removeChild(allPokemons.firstChild);
    }
    listOfPokemons.forEach((pokemon)=>{
        if(pokemon.pokemonName.startsWith(event.target.value)){
            const pokemonCard=createPokemonCard(pokemon);
            allPokemons.appendChild(pokemonCard);
        }
    })
}

function displaySelectedPokemon(pokemon){

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
        if(window.innerWidth<800){
            window.scrollTo({
                top: 3000,
                behavior: "smooth",
              })
        }
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
    const favouriteButton=document.querySelector('.favouriteButton');
    const searchBar=document.querySelector('.searchBar')
    searchBar.value='';
    currentPage=1;
    while(aside.firstChild){
        aside.removeChild(aside.firstChild);
    }
    if(favouritesShowed==false){
        displayPokemonCards(favouritesPokemons);
        favouriteButton.textContent="All";
        favouritesShowed=true;
    }
    else{
        displayPokemonCards(pokemons);
        favouriteButton.textContent="Favourites";
        favouritesShowed=false;
    }
    
}

export function removeFavouriteFromUi(pokemon){

    allPokemons.childNodes.forEach((node)=>{
        if(node.textContent===pokemon.pokemonName){
            allPokemons.removeChild(node);
        }
    })
    while(aside.firstChild){
        aside.removeChild(aside.firstChild);
    }
}


