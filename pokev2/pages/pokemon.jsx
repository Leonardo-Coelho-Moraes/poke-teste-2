import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/pokemonsolo.module.css'
import Image from 'next/image';

function Pokemon({ pokemonNumber }) {
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
  <div className={styles.card}>

    <Image src={pokemon.sprites.other.home.front_default} width='249' height='253' className={styles.imagepokemon} />
    <div className={styles.cardcontent}>
      <h2>{pokemon.name}</h2>
      <div className={styles.tam}>
        <h3>{`${pokemon.height / 10}m`}<span>Altura</span></h3>
        <h3>{`${pokemon.weight / 10}kg`}<span>Peso</span></h3>
      </div>
      <div className={styles.types}>
        {pokemon.types.map((item, index) =>(
        <span key={index} className={`${styles.type} ${styles['type_' + item.type.name]}`}>{item.type.name}</span>
        ))}
      </div>
      <div>
        <ul className={styles.stats}>
          <li className={styles.stat}>
            <h4>hp: <h4 ref={hpRef}>{pokemon.stats[0].base_stat}</h4>
            </h4>

            <div className={styles.statbar}>
              <div className={styles.progress} ref={hpProgressRef}></div>
            </div>
          </li>
          <li className={styles.stat}>
            <h4>ataque: <h4 ref={ataqueRef}>{pokemon.stats[1].base_stat}</h4>
            </h4>

            <div className={styles.statbar}>
              <div className={styles.progress} ref={ataqueProgressRef}></div>
            </div>
          </li>
          <li className={styles.stat}>
            <h4>defesa: <h4 ref={defesaRef}> {pokemon.stats[2].base_stat}</h4>
            </h4>

            <div className={styles.statbar}>
              <div className={styles.progress} ref={defesaProgressRef}></div>
            </div>
          </li>
          <li className={styles.stat}>
            <h4>velocidade: <h4 ref={velocidadeRef}>{pokemon.stats[5].base_stat}</h4>
            </h4>

            <div className={styles.statbar}>
              <div className={styles.progress} ref={velocidadeProgressRef}></div>
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

function PokemonList({ onPokemonClick }) {
const [pokemonList, setPokemonList] = useState([]);

useEffect(() => {
const fetchPokemonList = async () => {
const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');
const data = await response.json();

const pokemonArray = await Promise.all(
data.results.map(async (pokemon) => {
const response = await fetch(pokemon.url);
const data = await response.json();

return {
name: data.name,
image: data.sprites.front_default,
id: data.id,
};
})
);

setPokemonList(pokemonArray);
};

fetchPokemonList();
}, []);

return (
<div className={styles.pokemap}>
  <h1>Pokemon List</h1>
  <ul className={styles.pokelist}>
    {pokemonList.map(pokemon => (
    <li key={pokemon.id} onClick={()=> onPokemonClick(pokemon.id)}>
      {pokemon.name}
      <img src={pokemon.image} alt={pokemon.name} />
    </li>
    ))}
  </ul>
</div>
);
}

function App() {
const [selectedPokemon, setSelectedPokemon] = useState(1);

const handlePokemonClick = (id) => {
setSelectedPokemon(id);
};

return (
<section className={styles.sec}>
  <Pokemon pokemonNumber={selectedPokemon} />
  <PokemonList onPokemonClick={handlePokemonClick} />
</section>
);
}

export default App;
