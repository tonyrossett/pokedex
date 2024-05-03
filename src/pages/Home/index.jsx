import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Container from '../../components/Container';
import styles from '../Home/Home.module.css';
import Card from '../../components/Card';
import { portugueseToEnglish } from '../../utils/LanguageMappings/languageMappings';
import { CgAddR } from "react-icons/cg";
import { Button } from "../../components/Button/index"

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let allPokemons = [];
      let url = 'https://pokeapi.co/api/v2/pokemon/';

      while (url) {
        const response = await axios.get(url);
        allPokemons = allPokemons.concat(response.data.results);
        url = response.data.next;
      }
      const pokemonDetailPromises = allPokemons.map(pokemon => axios.get(pokemon.url));

      const pokemonDetailResponses = await axios.all(pokemonDetailPromises);

      const formattedPokemons = pokemonDetailResponses.map(response => response.data);

      setPokemons(formattedPokemons);
      setLoading(false);
      console.log('retorno api home', formattedPokemons)
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error.message);
    }
  };

  const handleLoadMore = () => {
    setLimit(limit + 10);
  };

  const searchPokemon = (searchTerm) => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    

    if (portugueseToEnglish[formattedSearchTerm]) {
      formattedSearchTerm = portugueseToEnglish[formattedSearchTerm];
    }

    const filteredPokemons = pokemons.filter(pokemon =>
      pokemon.id.toString() === formattedSearchTerm || 
      pokemon.name.includes(formattedSearchTerm) || 
      pokemon.types.some(type => type.type.name.includes(formattedSearchTerm)) 
      );

    setSearchResults(filteredPokemons);
  };

  return (
    <>
      <Header  />
      <Container>
        <section className={styles.home}>
          {loading ? (
            <div className={styles.loading}>Aguarde enquanto os Pokemons são carregados...</div>
          ) : (
            <>
              {searchResults.length > 0 ? (
                searchResults.map((pokemon, index) => (
                  <Card key={index} pokemon={pokemon} />
                ))
              ) : (
                pokemons.slice(0, limit).map((pokemon, index) => (
                  <Card key={index} pokemon={pokemon} />
                ))
              )}
            </>
          )}
        </section>
        <div className={styles.button}>
        <Button  onClick={handleLoadMore}>
        <CgAddR />
        </Button>
        </div>
     
      </Container>
    </>
  );
}

export default Home;
