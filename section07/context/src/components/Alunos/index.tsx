import { Nome } from "../Nome";
import { useContext } from "react";
import { UserContext } from "../../contents/user"


export function Alunos(){

    const { qtdAlunos, mudaNome } = useContext(UserContext)

    return (
        <div> 
            <h1> Quantidade de alunos: {qtdAlunos} </h1>
            <button
            onClick={ () => mudaNome("Tadeu Neres")}
            > Mudar Nome </button>

            <br />
            <br />
            <Nome/>

        </div>
    )
}