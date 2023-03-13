import { Children } from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"

import Head from "next/head"


Navbar
export default function Layout({children}){
    return(
        <>
        <Head>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet" />
        <title>Create Next App</title>
        <meta name="description" content="Pokemons e informações sobre eles" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        
      </Head>
            <Navbar/>
            <main>{children}</main>
            <Footer/>
        </>    
    )
}