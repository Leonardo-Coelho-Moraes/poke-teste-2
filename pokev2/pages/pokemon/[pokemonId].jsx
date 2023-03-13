
 import Image from "next/image";
import { useEffect, useRef } from "react";
 import styles from "../../styles/pokemonsolo.module.css"


export const getStaticPaths = async () => {
    const maxPokemons = 100;
    const api = 'https://pokeapi.co/api/v2/pokemon/'
  
    const res = await fetch(`${api}?limit=${maxPokemons}`)
  
    const data = await res.json()
    const paths = data.results.map((pokemon, index) =>{
        return{
            params:{pokemonId: (index + 1).toString()}
        }
    })
    return{
        paths,
        fallback: false,
    }

 }
export const getStaticProps = async (context) => {
    const id = context.params.pokemonId
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await res.json()
    return{
        props: {
          pokemon: data,
        },
      }

 }




export default function Pokemon ({pokemon}){
    const hpRef = useRef(null);
    const ataqueRef = useRef(null);
    const defesaRef = useRef(null);
    const velocidadeRef = useRef(null);
  
    useEffect(() => {
      const calculateWidth = (value, max) => `${(value / max) * 100}%`;
  
      hpRef.current.style.width = calculateWidth(pokemon.stats[0].base_stat, 150);
      ataqueRef.current.style.width = calculateWidth(pokemon.stats[1].base_stat, 150);
      defesaRef.current.style.width = calculateWidth(pokemon.stats[2].base_stat, 150);
      velocidadeRef.current.style.width = calculateWidth(pokemon.stats[5].base_stat, 154);
    }, [pokemon]);
    return(
        <>
        <section className={styles.sectionpoke}>
            <div className={styles.card}>
                <Image src={pokemon.sprites.other.home.front_default} width='269' height='273'  className={styles.imagepokemon} />
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
                        <h4>hp</h4>
                        
                        <div className={styles.statbar} ><div className={styles.progress} ref={hpRef}></div></div>
                    </li>
                    <li className={styles.stat}>
                        <h4>ataque</h4>
                      
                        <div className={styles.statbar}><div className={styles.progress} ref={ataqueRef}></div></div>
                    </li>
                    <li className={styles.stat}>
                        <h4>defesa</h4>
                       
                        <div className={styles.statbar}><div className={styles.progress} ref={defesaRef}></div></div>
                    </li>
                    <li className={styles.stat}>
                        <h4>velocidade</h4>
                      
                        <div className={styles.statbar}><div className={styles.progress} ref={velocidadeRef}></div></div>
                    </li>
                </ul>
               </div>
            </div>
            </div>
        </section>
        </>
    )
}