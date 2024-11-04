import { Link } from 'react-router-dom'


export function Home(){
    return(
        <div>

            <h1> Bem vindo a página Home</h1>
            <span> Essa é minha primeira página</span>
            <br/>

            <Link to="/sobre"> Sobre </Link>
            <Link to="/contato"> Contato</Link>

        </div>
    )
}