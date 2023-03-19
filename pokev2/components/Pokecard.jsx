import Image from 'next/image';
import pokebola from '../public/pokebola.svg'
import peso from '../public/weight.svg'
import regua from '../public/straighten.svg'
import styles from '../styles/pokemonsolo.module.css'
import React, { useState, useEffect, useRef } from 'react';



export default function Pokecard ({ pokemonNumber}){
    const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
const [pokemon, setPokemon] = useState(null);
const hpRef = useRef(null);
const hpProgressRef = useRef(null);
const ataqueRef = useRef(null);
const ataqueProgressRef = useRef(null);
const defesaRef = useRef(null);
const defesaProgressRef = useRef(null);
const velocidadeRef = useRef(null);
const velocidadeProgressRef = useRef(null);




useEffect(() => {
const fetchPokemon = async () => {
const response = await fetch(url);
const data = await response.json();
setPokemon(data);
};

fetchPokemon();
}, [url]);

useEffect(() => {
setUrl(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
}, [pokemonNumber]);

useEffect(() => {
const calculateWidth = (value, max) => `${(value / max) * 100}%`;
if (hpRef.current) {
const hp = hpRef.current.textContent;
hpProgressRef.current.style.width = calculateWidth(hp, 150);
}
if (ataqueRef.current) {
const ataque = ataqueRef.current.textContent;
ataqueProgressRef.current.style.width = calculateWidth(ataque, 150);
}
if (defesaRef.current) {
const defesa = defesaRef.current.textContent;
defesaProgressRef.current.style.width = calculateWidth(defesa, 150);
}
if (velocidadeRef.current) {
const velocidade = velocidadeRef.current.textContent;
velocidadeProgressRef.current.style.width = calculateWidth(velocidade, 150);
}
}, [pokemon]);

return (
<div className={styles.pokesolo}>

  {pokemon && (
  <div className={`${styles.card} ${styles['type_' + pokemon.types[0].type.name]}`}>
    <Image src={pokebola} width="220" className={styles.pokebola}/>

    <Image src={pokemon.sprites.other['official-artwork'].front_default} width='200' height='200' className={styles.imagepokemon} />
    <div className={styles.cardcontent}>
      <h2>{`${pokemon.name}.`}</h2>
      <div className={styles.tam}>
      <div className={styles.peso}>
        <Image src={peso} width='16' height='16' />
          <h3 className={styles.tam1} >{`${pokemon.weight / 10}kg`}<span>Peso</span></h3>
        </div>
        <div className={styles.peso}>
          <Image src={regua} width='16' height='16' />
          <h3  >{`${pokemon.height / 10}m`}<span>Altura</span></h3>
        </div>
      </div>
      <div className={styles.types}>
        {pokemon.types.map((item, index) =>(
        <span key={index} className={`${styles.type} ${styles['type_' + item.type.name]}`}>{item.type.name}</span>
        ))}
      </div>
      <div>
        <ul className={styles.stats}>
          <li className={styles.stat}>
            <h4 className={styles[pokemon.types[0].type.name]}>vida: <h4 ref={hpRef}>{pokemon.stats[0].base_stat}</h4>
            </h4>

            <div className={styles.statbar}>
              <div className={`${styles.progress} ${styles[ 'type_' + pokemon.types[0].type.name]}`} ref={hpProgressRef}></div>
            </div>
          </li>
          <li className={styles.stat}>
            <h4 className={styles[pokemon.types[0].type.name]}>ataque: <h4 ref={ataqueRef}>{pokemon.stats[1].base_stat}</h4>
            </h4>

            <div className={styles.statbar}>
              <div className={`${styles.progress} ${styles['type_' + pokemon.types[0].type.name]}`} ref={ataqueProgressRef}></div>
            </div>
          </li>
          <li className={styles.stat}>
            <h4 className={styles[ pokemon.types[0].type.name]}>defesa: <h4 ref={defesaRef}> {pokemon.stats[2].base_stat}</h4>
            </h4>

            <div className={styles.statbar}>
              <div className={`${styles.progress} ${styles['type_' + pokemon.types[0].type.name]}`} ref={defesaProgressRef}></div>
            </div>
          </li>
          <li className={styles.stat}>
            <h4 className={styles[pokemon.types[0].type.name]}>velocidade: <h4 ref={velocidadeRef}>{pokemon.stats[5].base_stat}</h4>
            </h4>

            <div className={styles.statbar}>
              <div className={`${styles.progress} ${styles['type_' + pokemon.types[0].type.name]}`} ref={velocidadeProgressRef}></div>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
  )}

</div>
);

}