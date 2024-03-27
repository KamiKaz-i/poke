import {getPokemonsData} from './pokemonData.js';
import {createPokemonCard, createSeletedCard} from './createPokemonCard.js';
import {addToFavourites, favouritesPokemons} from './favouritePokemon.js';

export const pokemons = await getPokemonsData();
export const aside = document.querySelector('aside');
const favouriteButton = document.querySelector('.favouriteButton');
const searchBar = document.querySelector('.searchBar');
const next = document.querySelector('.next');
const previous = document.querySelector('.previous');
const allPokemons = document.querySelector('.pokemons');
const pokemonsPerPage = 6;
const searchedPokemons = [];
         
export let favouritesShowed = false;
let currentPage = 1;
let isSearching = false;

function checkIfItsLastPage(listOfPokemons){
  if(currentPage < Math.ceil(listOfPokemons.length / pokemonsPerPage)){
      currentPage += 1;
      displayPokemonCards(listOfPokemons);
  }
}

function checkIfItsFirstPage(listOfPokemons){
  if(currentPage > 1){
      currentPage -= 1;
      displayPokemonCards(listOfPokemons);
    }
}

next.addEventListener("click", ()=>{
    if(favouritesShowed){
        isSearching ? checkIfItsLastPage(searchedPokemons) : checkIfItsLastPage(favouritesPokemons);
    }
    else{
        isSearching ? checkIfItsLastPage(searchedPokemons) : checkIfItsLastPage(pokemons);
    }
})

previous.addEventListener("click", ()=>{ 
  if(favouritesShowed){
    isSearching ? checkIfItsFirstPage(searchedPokemons) : checkIfItsFirstPage(favouritesPokemons);
  }
  else{
    isSearching ? checkIfItsFirstPage(searchedPokemons) : checkIfItsFirstPage(pokemons);
  }
})

export function displayPokemonCards(listOfPokemons){
  allPokemons.innerHTML = '';
  const start = (currentPage - 1) * pokemonsPerPage;
  const end = start + pokemonsPerPage;
  const pokemonsToDisplay = listOfPokemons.slice(start, end);
   
  pokemonsToDisplay.forEach((pokemon) => {
    const pokemonCard = createPokemonCard(pokemon)
    allPokemons.appendChild(pokemonCard);
  })
  if(pokemonsToDisplay.length === 0){
    allPokemons.textContent = 'No pokemon were found';
  }
}
function pokemonNameStartsWith(listOfPokemons, event){
  listOfPokemons.forEach((pokemon) => {
    if(pokemon.pokemonName.startsWith(event.target.value.toLowerCase())){
      searchedPokemons.push(pokemon)
    }
  })
  displayPokemonCards(searchedPokemons);
}

function displaySelectedPokemon(pokemon){
  aside.innerHTML = "";
  const selectedCard = createSeletedCard(pokemon);
  aside.appendChild(selectedCard);

  const selectedFavouriteButton = document.querySelector('.selectedPokemonFavouriteButton');
  const favouriteIcon = document.querySelector('.selectedPokemonFavouriteIcon');
  
  selectedFavouriteButton.addEventListener("click", () => {
    if(favouritesPokemons.some((poke) => poke.pokemonName==pokemon.pokemonName)){
      favouriteIcon.setAttribute('src', 'images/estar.svg')
    }
    else{
      favouriteIcon.setAttribute('src', 'images/star.svg')
    }
    addToFavourites(pokemon)
  });
  
}   

export function handlePokemonClick(event){
  const clickedPokemon = event.target.closest('.pokemonCard');
  if(clickedPokemon){
    const pokemonName = clickedPokemon.childNodes[0].textContent;
    
    if(window.innerWidth < 1150){
      aside.scrollIntoView({block: 'start', inline: 'nearest', behavior: 'smooth'});
    }
        
    for(const pokemon of pokemons){
      if(pokemon.pokemonName === pokemonName){
        displaySelectedPokemon(pokemon)
      }
    }
  }
}

export function handleSearch(event){
  searchedPokemons.splice(0, searchedPokemons.length)
  currentPage = 1;
  if(favouritesShowed == false){
    if(event.target.value !== ""){
      isSearching = true;
      pokemonNameStartsWith(pokemons, event);
    }
    else{
      isSearching = false;
      displayPokemonCards(pokemons);
            
    }
  }
  else{
    if(event.target.value !== ''){
      isSearching = true;
      pokemonNameStartsWith(favouritesPokemons, event);
    }
    else{
      isSearching = false;
      displayPokemonCards(favouritesPokemons);
    }
  }
}

export function handleShowFavourites(){
  
  isSearching = false;
  currentPage = 1;
  searchBar.value = '';
  aside.innerHTML = '';

  if(favouritesShowed == false){
    displayPokemonCards(favouritesPokemons);
    favouriteButton.textContent = 'All';
    favouritesShowed = true;
  }
  else{
    displayPokemonCards(pokemons);
    favouriteButton.textContent = 'Favourites';
    favouritesShowed = false;
  }
}
