import axios from 'axios';

const getPokemonDataByPokemonId = async (pokemonId) => {
  try {
    const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const pokemonData = pokemonResponse.data;

    const sprites = pokemonData.sprites;
    const spriteUrls = Object.values(sprites).filter(url => url);
    const types = pokemonData.types.map(type => type.type.name);
    const imagesArray = spriteUrls;
    const movesPromises = pokemonData.moves.map(move => axios.get(move.move.url));
    const movesResponses = await axios.all(movesPromises);
    const movesData = movesResponses.map(response => response.data);
    const abilitiesPromises = pokemonData.abilities.map(ability => axios.get(ability.ability.url));
    const abilitiesResponses = await axios.all(abilitiesPromises);
    const abilitiesData = abilitiesResponses.map(response => response.data)

    return {
      pokemonData,
      imagesArray,
      movesData,
      types,
      abilitiesData,
      isLoading: false
    };
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error.message);
    return {
      pokemonData: null,
      imagesArray: [],
      movesData: [],
      types: [],
      abilitiesData: [],
      isLoading: true
    };
  }
};

export default getPokemonDataByPokemonId;