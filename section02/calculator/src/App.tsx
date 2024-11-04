import { useState, FormEvent } from 'react'
import './App.css'
import logoimg from './assets/logo.png'

interface InfoProps{
  title: string;
  gasoline: string | number;
  alcohol: string | number;
}


function App() {
    const [gasolineInput, setGasolineInput] = useState(0)
    const [alcoholInput, setAlcoholInput] = useState(0)
    const [info, setInfo] = useState<InfoProps>()


    function calculate(event: FormEvent){
      event.preventDefault();

      let calculo = (alcoholInput / gasolineInput)
      
      if(calculo <= 0.7){
        setInfo({
          title: "Compensa usar álcool",
          gasoline: formatarMoeda(gasolineInput),
          alcohol: formatarMoeda(alcoholInput)
        })
      }else{
        setInfo({
          title: "Compensa usar gasolina",
          gasoline: formatarMoeda(gasolineInput),
          alcohol: formatarMoeda(alcoholInput)
        })
      }

    }


    function formatarMoeda(valor: number){
      let valorFormatado = valor.toLocaleString("pt-br",
        {
          style: "currency",
          currency: 'BRL'
        }
      )

      return valorFormatado
    }

    return (
    <div>
     <main className='container'>
      <img src={logoimg}
      className='logo'
      alt='Logo calculator'
      />
      <h1 className='title'> Qual a melhor opção?? </h1>
     
    <form className='form' onSubmit={calculate}>
      <label>
        ÁLCOHOL ( Preço por litro): 
      </label>
      <input 
        className='input'
        type='number'
        placeholder='4,90'
        min="1"
        step="0.01"
        required
        value={alcoholInput}
        onChange={ (e)=> setAlcoholInput(Number(e.target.value)) }
      />

      <label>
        GASOLINE ( Preço por litro): 
      </label>
      <input 
        className='input'
        type='number'
        placeholder='4,90'
        min="1"
        step="0.01"
        required
        value={gasolineInput}
        onChange={ (e)=> setGasolineInput(Number(e.target.value)) }
      />

      
      <input className='button' type="submit" value="Calculate" />
    </form>
     
        {info && Object.keys(info).length > 0 && (
                  <section className='result'>
                  <h2 className='result-title'>{info.title}</h2>
                  <span> Alcohol {info.alcohol} </span>
                  <span> Gasoline {info.gasoline} </span>
        
                </section>        
        )}


     </main>
    </div>
  )
}

export default App
