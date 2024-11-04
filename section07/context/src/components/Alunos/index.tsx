import { Nome } from "../Nome"
interface AlunosProps{
    alunoNome: string;
    changeName: (name: string) => void;
}

export function Alunos({ alunoNome, changeName }: AlunosProps ){
    return (
        <div> 
            <h1> Quantidas de alunos: 23 </h1>
            <Nome nome={alunoNome} changeName= {changeName}/>
        </div>
    )
}