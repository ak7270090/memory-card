import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import Singlecard from './components/Singlecard';


const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" },
];



function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne,setChoiceOne]=useState(null)
  const [choiceTwo,setChoiceTwo]=useState(null)
  const [disabled,setDisabled]=useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random(),matched: false }))
      
    setCards(shuffledCards)
    setTurns(0)
  }



  const handlechoice=(card)=>
  {
    console.log(card);
    choiceOne?setChoiceTwo(card):setChoiceOne(card);
  }
  
  useEffect(()=>
  {
    if(choiceOne && choiceTwo){
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card,matched: true}
            }

            else{
              return card 
            }
          })
        })
        console.log('matched')
        resetTurn()
      }

      else{
        console.log('not matched')
        setTimeout(() => {
          resetTurn()
        }, 1000);
        
      }
    }
  },[choiceOne,choiceTwo])

  console.log(cards);

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>Magic game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <h4>turns : {turns}</h4>

      <div className="card-grid">
        {cards.map(card => (
          <Singlecard 
          key={card.id} 
          card={card}
           handlechoice={handlechoice}
           flipped={card === choiceOne || card === choiceTwo || card.matched}
           disabled={disabled}
          ></Singlecard>
        ))}
      </div>

    </div>
  );
}

export default App;
