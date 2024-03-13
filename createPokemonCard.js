import { favouritesPokemons } from "./favouritePokemon.js";
export function createPokemonCard(pokemon){
    const pokemonCard=document.createElement('div');
    const pokemonCardHeader=document.createElement('div');
    const pokemonCardImage=document.createElement('img');
    
    pokemonCard.className="pokemonCard";

    pokemonCardImage.setAttribute("key",pokemon.pokemonId);
    pokemonCardImage.setAttribute("src",pokemon.pokemonImageSvgUrl);
    pokemonCardImage.setAttribute("alt",`pokemon at ${pokemon.pokemonId}`);

    pokemonCardHeader.textContent=pokemon.pokemonName;
    
    pokemonCard.appendChild(pokemonCardHeader);
    pokemonCard.appendChild(pokemonCardImage);
    
    return pokemonCard
}

export function createSeletedCard(pokemon){
    const selectedPokemonFavouriteButton=document.createElement('button');
    const selectedPokemonFavouriteIcon=document.createElement('img');

    const selectedPokemon=document.createElement('div');
    const selectedPokemonHeader=document.createElement('div');
    const selctedPokemonImage=document.createElement('img');
    const selectedPokemonAtributes=document.createElement('div');
    const selectedPokemonWeight=document.createElement('div');
    const selectedPokemonHeight=document.createElement('div');
    const selectedPokemonTypes=document.createElement('div');
    const selectedPokemonStats=document.createElement('div');

    selectedPokemonFavouriteButton.classList.add('selectedPokemonFavouriteButton');
    selectedPokemonFavouriteIcon.classList.add('selectedPokemonFavouriteIcon');
    
    selectedPokemon.classList.add('selectedPokemon');
    selctedPokemonImage.classList.add('selctedPokemonImage');
    selectedPokemonHeader.classList.add('selectedPokemonHeader');
    selectedPokemonAtributes.classList.add('selectedPokemonAtributes');
    selectedPokemonWeight.classList.add('selectedPokemonWeight');
    selectedPokemonHeight.classList.add('selectedPokemonHeight');
    selectedPokemonTypes.classList.add('selectedPokemonTypes');
    selectedPokemonStats.classList.add('selectedPokemonStats');

    const typeFragment=document.createDocumentFragment();
    const statFramgent=document.createDocumentFragment();

    for(const type of pokemon.pokemonTypes){
        const pokemonType=document.createElement('p');
        pokemonType.textContent=type;
        typeFragment.appendChild(pokemonType);
    }

    for(const stat of pokemon.pokemonStats){
        const pokemonStat=document.createElement('p');

        pokemonStat.textContent=stat.stat.name+" "+stat.base_stat

        statFramgent.appendChild(pokemonStat);
    }
    selectedPokemonHeight.textContent="Height  "+pokemon.pokemonHeight;
    selectedPokemonWeight.textContent="Weight  "+pokemon.pokemonWeight;
    selectedPokemonTypes.replaceChildren(typeFragment);
    selectedPokemonStats.replaceChildren(statFramgent);
    selctedPokemonImage.setAttribute("src",pokemon.pokemonImageSvgUrl);

    if(favouritesPokemons.some((poke)=>poke.pokemonName==pokemon.pokemonName)){
        selectedPokemonFavouriteIcon.setAttribute("src",'images/star.svg');
    }
    else{
        selectedPokemonFavouriteIcon.setAttribute("src",'images/estar.svg');
    }
    


    
    selectedPokemonAtributes.appendChild(selectedPokemonWeight)
    selectedPokemonAtributes.appendChild(selectedPokemonHeight)
    selectedPokemonAtributes.appendChild(selectedPokemonStats)
    selectedPokemonAtributes.appendChild(selectedPokemonTypes)
    selectedPokemonFavouriteButton.appendChild(selectedPokemonFavouriteIcon);
      
    selectedPokemonHeader.textContent=pokemon.pokemonName+" -->";
    selectedPokemonHeader.appendChild(selectedPokemonFavouriteButton);  

    selectedPokemon.appendChild(selectedPokemonHeader);
    selectedPokemon.appendChild(selctedPokemonImage);
    selectedPokemon.appendChild(selectedPokemonAtributes);
    
    

    return selectedPokemon
}