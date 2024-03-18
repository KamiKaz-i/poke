import {getPokemonsData} from "./pokemonData.js";
import {createPokemonCard,createSeletedCard} from "./createPokemonCard.js";
import {addToFavourites,favouritesPokemons} from "./favouritePokemon.js";

export const pokemons=await getPokemonsData();
export let favouritesShowed=false;

const next=document.querySelector('.next');
const previous=document.querySelector('.previous');
const allPokemons=document.querySelector('.pokemons');
const aside=document.querySelector('aside');
let currentPage=1;
const pokemonsPerPage=9;
const searchedPokemons=[];
let isSearching=false;

function checkIfItsLastPage(listOfPokemons){

    if(currentPage<Math.ceil(listOfPokemons.length/pokemonsPerPage)){
        currentPage+=1;
        displayPokemonCards(listOfPokemons);
    }
}

function checkIfItsFirstPage(listOfPokemons){

    if(currentPage>1){
        currentPage-=1;
        displayPokemonCards(listOfPokemons);
    }
}

next.addEventListener("click",()=>{
    
    if(favouritesShowed){
        if(isSearching){
            checkIfItsLastPage(searchedPokemons);
        }
        else{
            checkIfItsLastPage(favouritesPokemons);
        }
    }
    else{
        if(isSearching){
            checkIfItsLastPage(searchedPokemons);
        }
        else{
            checkIfItsLastPage(pokemons);
        }
    }
})

previous.addEventListener("click",()=>{
    
    if(favouritesShowed){
        if(isSearching){
            checkIfItsFirstPage(searchedPokemons);
        }
        else{
            checkIfItsFirstPage(favouritesPokemons);
        }
    }
    else{
        if(isSearching){
            checkIfItsFirstPage(searchedPokemons);
        }
        else{
            checkIfItsFirstPage(pokemons);
        }
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
    if(pokemonsToDisplay.length===0){
        allPokemons.textContent="Not Found In The Wild";
    }
}
function pokemonNameStartsWith(listOfPokemons,event){

    listOfPokemons.forEach((pokemon)=>{
        if(pokemon.pokemonName.startsWith(event.target.value)){
            searchedPokemons.push(pokemon)
        }
    })
    displayPokemonCards(searchedPokemons);
   
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

    if(window.innerWidth<800){
        aside.scrollIntoView({block: "start", inline: "nearest",behavior:"smooth"});
    }

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

    searchedPokemons.splice(0,searchedPokemons.length)
    currentPage=1;
    if(favouritesShowed==false){
        if(event.target.value!==""){
            isSearching=true;
            pokemonNameStartsWith(pokemons,event);
        }
        else{
            displayPokemonCards(pokemons);
            isSearching=false;
        }
    }
    else{
        if(event.target.value!==""){
            isSearching=true;
            pokemonNameStartsWith(favouritesPokemons,event);
        }
        
        else{
            isSearching=false;
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