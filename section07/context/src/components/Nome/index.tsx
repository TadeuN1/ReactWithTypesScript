import { useContext } from "react"
import { UserContext } from "../../contents/user"


export function Nome(){

    const {aluno} = useContext(UserContext)


    return (
        <div> 
            <strong> Aluno: {aluno} </strong>
            <br />

        </div>
    )
}