import { useState } from 'react'
import './App.css'
import logoImg from './assets/logo.png'



function App() {
    const [ textoFrase, setTextoFrase] = useState("")
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(0)

    const allFrases = [
      {
        id: 1,
        nome: "Motivação",
        frases: [
          'Siga os bons e aprenda com eles',
          'A gratidão é uma grande aliada do sucesso!',
          'A gratidão é o único tesouro dos humildes.',
          'A gratidão é a virtude das almas nobres.',
          'A gratidão tem memória curta.',
          'Aos incapazes de gratidão nunca faltam pretextos para não a ter.',
          'A gratidão é uma dívida que os filhos nem sempre aceitam no inventário.',
          'O quão feliz é uma pessoa depende da profundidade de sua gratidão.',
          'Expresse gratidão com palavras e atitudes. Sua vida mudará muito de modo positivo.',
          'Não cobres tributos de gratidão.',
          'A gratidão não custa nada - e tem um valor imenso!'
        ]
      }, 
      {
        id: 2,
        nome: "Bom dia",
        frases: [
          'Bom dia! Seja a luz que ilumina o caminho dos outros hoje.',
          'Que a serenidade acompanhe você, e que cada desafio seja uma chance de aprender. Bom dia!',
          'Cada novo dia é uma página em branco. Escreva uma história incrível. Bom dia!',
          'A vida é curta. Aproveite cada momento e faça valer a pena. Bom dia!',
          'Que a alegria e a felicidade sigam você por onde quer que vá. Bom dia!',
          'Bom dia! Hoje é o dia perfeito para começar a realizar seus sonhos.',
          'Bom dia! Faça do hoje algo extraordinário!',
          'Celebre a vida a cada momento. Bom dia!',
          'Você é mais forte do que pensa. Bom dia!'
        ]
      }
    ]

    function handleSwitchCategory(index: number){
      setCategoriaSelecionada(index)
    }
    function gerarFrase(){
      let numeroAleatorio = Math.floor(Math.random() * allFrases[categoriaSelecionada].frases.length)

      setTextoFrase(`"${allFrases[categoriaSelecionada].frases[numeroAleatorio]}"`)
    }

  return (
    <div className='container'>
      <img
      alt='Logo frases'
      src={logoImg}
      className='logo'
      ></img>
      <h2 className='title'> Categorias </h2>

      <section className='category-area'>
        {allFrases.map((item, index) => (
          <button
            key={item.id}
            className='category-button'
            style={{
              borderWidth: item.nome === allFrases[categoriaSelecionada].nome ? 2 : 0,
              borderColor: "#1fa4db"
            }}

            onClick={() => handleSwitchCategory(index)}
          >
           {item.nome}
          </button>
        ))}
      </section>


      <button onClick={gerarFrase} className='button-frase'> Gerar frase</button>

        { textoFrase !== '' && <p className='textoFrase'> {textoFrase} </p>}

    </div>
  )
}

export default App
