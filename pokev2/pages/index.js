import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import CardPokemon from '@/components/CardPokemon'

export async function getStaticProps(){
  const maxPokemons = 100;
  const api = 'https://pokeapi.co/api/v2/pokemon/'

  const res = await fetch(`${api}?limit=${maxPokemons}`)

  const data = await res.json()

  data.results.forEach((item, index) => {
    item.id = index + 1
  })
  return{
    props: {
      pokemons: data.results,
    },
  }
}

export default function Home({ pokemons }) {
  return (
    <>
      
      
        <div className={styles.pokemons}>
        
          {pokemons.map((pokemon) =>(
             <CardPokemon  key={pokemon.id} pokemon={pokemon}  />

            
        
          ))}
        
        </div>
    </>
  )
}
