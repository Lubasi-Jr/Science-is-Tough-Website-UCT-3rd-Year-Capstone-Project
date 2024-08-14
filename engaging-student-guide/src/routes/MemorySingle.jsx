import './MemorySingle.css'

function MemorySingle({ card,selectedChoice,flipping,disableSelection }){
    const clicked = () =>{
        if (!disableSelection){ //only update choice is selection is not disabled
            selectedChoice(card)
        }  
    }
 return(
    /*only flip card when selected or matched*/
 <div className="actual-card">
     <div className={flipping ? "flipping":""}>
      <img className="front"src={card.src} alt= "card front"/>
      <img className="back" src="images/cardbackground_image.png" onClick={clicked} alt = "card back"/>
     </div>
 </div>
 );
}
export default MemorySingle