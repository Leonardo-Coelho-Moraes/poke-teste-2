import React, { useState, useEffect, useRef} from 'react';
import styles from '../styles/pokemonsolo.module.css'
import Image from 'next/image';
import Pokecard from '@/components/Pokecard';
import PokemonList from '@/components/PokemonList';



function App() {
const [selectedPokemon, setSelectedPokemon] = useState(1);

const handlePokemonClick = (id) => {
setSelectedPokemon(id);
};

return (
<section className={styles.sec}>
  <Pokecard pokemonNumber={selectedPokemon} />
  <PokemonList onPokemonClick={handlePokemonClick} />
</section>
);
}

export default App;
