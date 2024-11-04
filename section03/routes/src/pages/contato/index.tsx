import { Link } from "react-router-dom"

export function Contato(){
    return (
        <div>
            <h1>Bem vindo a página contatos!</h1>
            <h3>Telefone: (xx) x xxxx-xxxx</h3>

            <hr />

            <Link to="/sobre"> Sobre </Link>
            <Link to="/"> Ir para Home</Link>
        </div>
    )
}