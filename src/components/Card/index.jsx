import styles from "./Card.module.css"
import React from "react"
import { Link } from 'react-router-dom'

function Card({ pokemon }) {

    const imageUrl = pokemon.sprites?.front_default;
    const { types } = pokemon;
    
          return (
            <section className={styles.card}>
                <Link to={`/profile/${pokemon.id}`}>
                        <img src={imageUrl} alt={pokemon.name} />
                        <h4>#{pokemon.id}</h4>
                        <h3>{pokemon.name}</h3>
                        <div className={styles.types}>
                        <h5>Tipo</h5>
                        <ul>
                            {types.map((type, index) => ( 
                                <li key={index}>{type.type.name}</li> 
                            ))}
                        </ul>
                        </div>   
                </Link>
            </section>
        )
}

export default Card
