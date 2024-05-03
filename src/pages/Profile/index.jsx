import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../components/Container';
import Header from '../../components/Header';
import styles from '../Profile/Profile.module.css';
import getPokemonDataByPokemonId from "../../services/apiService"

function Profile() {
    const { pokemonId } = useParams();
    const [pokemonData, setPokemonData] = useState(null);
    const [abilitiesData, setAbilityData] = useState([]);
    const [movesData, setMovesData] = useState([]);

    useEffect(() => {
        getPokemonDataByPokemonId(pokemonId)
            .then(({ pokemonData, movesData, abilitiesData }) => {
                setPokemonData(pokemonData);
                setAbilityData(abilitiesData);
                setMovesData(movesData);
            });
    }, [pokemonId]);


    return (
        <>
            <Header />
            <Container>
                <section className={styles.profile}>
                    {pokemonData ? (
                        <div>
                            <h3>Clique no logo Pokemon para retornar</h3>
                            <div className={styles.img_txt}>
                                <div className={styles.images}>
                                    <div>
                                        <img src={pokemonData.sprites.front_default} alt={pokemonData.name}></img>
                                        
                                    </div>
                                    
                                </div>
                                <div className={styles.details}>
                                    <p>{pokemonData.name}</p>
                                    <strong>Tipo</strong>
                                    <ul>
                                        {pokemonData.types.map((type, index) => (
                                            <li key={index}>{type.type.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <section className={styles.abilitiesTable}>
                                <strong>Habilidades</strong>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Habilidade</th>
                                            <th></th>
                                            <th></th>
                                            <th>Efeito</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {abilitiesData.map((ability, index) => (
                                            <tr key={index}>
                                                <td>{ability.name}</td>
                                                <td className='tdEspaco'></td>
                                                <td>{ability.effect_entries.length > 1 ? ability.effect_entries[1].effect : "Sem informações"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </section>
                            <p><strong>Movimentos</strong></p>
                            <section className={styles.move}>
                                
                                <table className={styles.movesTable}>
                                    <thead>
                                        <tr>
                                            {/* <th>Nome:</th> */}
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {movesData.map((move, index) => (
                                            <tr key={index}>
                                                
                                                <td>{index + 1} - {move.name}</td>
                                                
                                                
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section>
                        </div>
                    ) : (
                        <p>Carregando...</p>
                    )}

                </section>
            </Container>
        </>
    );
}


export default Profile;
