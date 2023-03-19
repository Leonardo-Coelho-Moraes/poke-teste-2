import React, { useState, useEffect, useRef} from 'react';
import styles from '../styles/pokemonsolo.module.css'
import Image from 'next/image';


import bug from '../public/img/poketypes/Type=Bug.svg'
import dark from '../public/img/poketypes/Type=Dark.svg'
import dragon from '../public/img/poketypes/Type=Dragon.svg'
import electric from '../public/img/poketypes/Type=Electric.svg'
import fairy from '../public/img/poketypes/Type=Fairy.svg'
import fighting from '../public/img/poketypes/Type=Fighting.svg'
import fire from '../public/img/poketypes/Type=Fire.svg'
import flying from '../public/img/poketypes/Type=Flying.svg'
import ghost from '../public/img/poketypes/Type=Ghost.svg'
import grass from '../public/img/poketypes/Type=Grass.svg'
import ground from '../public/img/poketypes/Type=Ground.svg'
import ice from '../public/img/poketypes/Type=Ice.svg'
import normal from '../public/img/poketypes/Type=Normal.svg'
import poison from '../public/img/poketypes/Type=Poison.svg'
import psychic from '../public/img/poketypes/Type=Psychic.svg'
import rock from '../public/img/poketypes/Type=Rock.svg'
import steel from '../public/img/poketypes/Type=Steel.svg'
import water from '../public/img/poketypes/Type=Water.svg'

const typeImages = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water,
};




export default function PokemonList({ onPokemonClick }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  

  useEffect(() => {
    const fetchPokemonList = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
      const data = await response.json();

      const pokemonArray = await Promise.all(
        data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const data = await response.json();

          return {
            name: data.name,
            image: data.sprites.front_default,
            id: data.id,
            type: data.types[0].type.name
          };
        })
      );

      setPokemonList(prevList => [...prevList, ...pokemonArray]);
    };

    fetchPokemonList();
  }, [offset]);

  const handleLoadMore = () => {
    setOffset(prevOffset => prevOffset + 20);
  }

  return (
    <div className={styles.pokemap}>
      <ul className={styles.pokelist}>
        {pokemonList.map(pokemon => (
          <li key={pokemon.id} onClick={()=> onPokemonClick(pokemon.id)} className={styles.pokemonlayer} >
            <p>{pokemon.name}</p>
            <div className={`${styles.tipologo} ${styles['type_' + pokemon.type]}`}>
              <Image src={typeImages[pokemon.type]} alt={pokemon.name} width="15" height="15"  />
            </div>
            <Image src={pokemon.image} alt={pokemon.name} width='96' height='96' />
          </li>
        ))}
        <div className={styles.btnmais}><button onClick={handleLoadMore}>Carregar mais</button></div>
      </ul>
      
    </div>
  );
}
