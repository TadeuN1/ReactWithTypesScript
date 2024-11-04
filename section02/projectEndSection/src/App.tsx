import { FormEvent, useState } from 'react'
import './App.css'

function App() {
  
  const [nome, setNome] = useState<string>("")
  const [idade, setIdade] = useState<number | string>("")
  const [resultado, setResultado] = useState(0)


  function calculate(e: FormEvent){
      e.preventDefault();

      const anoAtual = new Date().getFullYear();

      let calculo = (anoAtual - Number(idade));

      setResultado(calculo);
  }
  
  return (
    <div className='container'>
      
      <div>
        <main className='container'>
          <h2 className='title'> Descubra sua idade </h2>

          <form onSubmit={calculate}>
            <label className='label'> Digite seu nome </label>        
            <input
              className='input'
              placeholder='Digite aqui seu nome'
              required
              type='string'
              onChange={ (e) => setNome(e.target.value)}
            />

            <label className='label'> Digite seu ano de nascimento </label>        
            <input
              className='input'
              type='number'
              placeholder="1900"
              step="1"
              min="1901"
              required
              onChange={(e) => setIdade(Number(e.target.value))}
            />

            <input className='button' type='submit' value="Calcular" />
          </form>


          { resultado > 0 && <p className='result'> {nome} sua idade é: {resultado} anos. </p> }

          
        </main>
      </div>
      
    </div>
  )
}

export default App
