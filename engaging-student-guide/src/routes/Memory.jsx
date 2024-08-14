import { useEffect, useState } from 'react'
import './Memory.css'
import MemorySingle from './MemorySingle';


const cardImages = [
    {'src': "images/metacog.jpg",matched:false},
    {'src': "images/ref.jpg",matched:false},
    {'src': "images/brain.jpg",matched:false},
    {'src': "images/finals.jpg",matched:false},
    {'src': "https://th.bing.com/th?id=OIF.ljB7NofIHqWXfUUV%2fMM5nQ&rs=1&pid=ImgDetMain",matched:false},
    {'src':"images/read.png",matched:false}
]

function Memory(){
    const [cards,setCards] = useState([]);
    const [turnNo,setTurnNo] = useState(0);
    const[choice,setChoice] = useState(null);
    const[choiceTwo,setChoiceTwo] = useState(null);
    const[disableSelection,setdisableSelection] = useState(false)

    const shuffleCards = () => {
        const shuffledCards = [...cardImages,...cardImages]//create two of each card
            .sort(() => Math.random() - 0.5)//randomly sort cards in array
            .map((card)=>({...card,id:Math.random()}))
        setCards(shuffledCards);
        setTurnNo(0); //reset turns to zero when called
        setChoice(null);//ensure no values when games starts
        setChoiceTwo(null);
    }
    //console.log(cards,turnNo)
    const selectedChoice=(card)=>{
        //console.log(card);
        choice ? setChoiceTwo(card) : setChoice(card)
        }
      //fire function initially then each time a dependency changes(card1/2)  
    useEffect(()=>{
        if(choice&&choiceTwo){
            setdisableSelection(true)//user cannot select anymore cards
            if(choice.src===choiceTwo.src){
                setCards(prevCards =>{ //use previous state to update state
                    return prevCards.map(card =>{//array of cards 
                        if(card.src==choice.src){
                            return{...card,matched:true}//return new card object
                        }
                        else{
                            return card;
                        }
                    })
                }

                )
                //console.log("Your selected cards match")
                restarting()
            }
            else{
                //console.log("Your selected cards do not match")

                setTimeout(()=>restarting(),1000)//wait before immediately flipping back
            }
        }
    },[choice,choiceTwo])



    /*reseting the cards after a user has selected 2 cards*/
    const restarting = () =>{
        setChoice(null)
        setChoiceTwo(null)
        setTurnNo(prev => prev+1)
        setdisableSelection(false)
    }
    /*allows games to start without having to click new game button*/
    useEffect(()=>{
        shuffleCards()
    },[])

    return(
    <div className="Memory">
          <h1 className="oswald-text">Take a break and try memory match!</h1>
            <button onClick={shuffleCards}>New Game</button>
            <div className='grid'>
                {cards.map(card =>(
                    <MemorySingle key={card.id} card={card} selectedChoice={selectedChoice} flipping ={card==choice||card==choiceTwo||card.matched} disableSelection={disableSelection}/>
                ))}
            </div>
            <h4>Turns: {turnNo}</h4>
        </div>);
}
export default Memory