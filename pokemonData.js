export const pokemonCount=200;
export async function getPokemonsData(){
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${pokemonCount}`);
    const pokemonsData=await Promise.all(
        response.data.results.map(async(pokemon)=>{

            const pokemonData = await axios.get(pokemon.url);
            
            const pokemonType=[];
            const pokemonStat=[];

            pokemonData.data.types.forEach((elemenet)=>{
                pokemonType.push(elemenet.type.name);
            })
            pokemonData.data.stats.forEach((element)=>{
                pokemonStat.push(element);
            })
            return {
                pokemonName:pokemon.name,
                pokemonId:pokemonData.data.id,
                pokemonTypes:pokemonType,
                pokemonWeight:pokemonData.data.weight,
                pokemonHeight:pokemonData.data.height,
                pokemonStats:pokemonStat,
                pokemonImageSvgUrl:pokemonData.data.sprites.other.dream_world.front_default,
            }
        })
    )
    
    return pokemonsData
}

