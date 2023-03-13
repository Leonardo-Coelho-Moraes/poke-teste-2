import Image from "next/image"
import Link from "next/link"
import styles from "../styles/Home.module.css"

export default function CardPokemon({pokemon}){
    return(
        <>
        <div className={styles.cardpokemon} >
              
                <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} width='120' height='120' />
                <h3 className="pokeid">#{pokemon.id.toString().padStart(3, '0')}</h3>
                
                <h2>{pokemon.name}</h2>
                <Link href={`/pokemon/${pokemon.id}`}
                ><span>Mais</span>
                </Link>
              </div>
        </>
    )
}