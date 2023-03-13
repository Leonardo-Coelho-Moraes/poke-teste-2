import Link from "next/link"

export default function Navbar(){
    return(
        <header>
            <nav>
                <Link href="/">
                    <h1>Pokédata</h1>
                </Link>
            </nav>
        </header>
    )
}
