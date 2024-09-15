import React from 'react';
//import { FaStar } from 'react-icons/fa';
import { MdAudiotrack } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";

function Card({id,imageSrc,title,link,favourite,Fave}){
  /*creating card for home page with specific dimensions(15x20)
  Adding an image to the card and ensure the dimensions of all images are (120x120)
  Add the content title on each card and use custom font
  Read more button which will be pressed to enter the multimeida content page
  Lastly adding a star icon which will be coloured gold when a user decides to add the card to their favourites*/
  return(
   <div className="card" style={{width: "15rem",height:"20rem"}}> 
    <img src={imageSrc}className="card-img-top" alt="..." style={{height:"120px",width: "120px"}} />
    
    <div className="card-body">
     <h4 className="oswald-text">{title}</h4>
      <div className="card-icons">
          <GrDocumentPdf className="card-icon" />
          <MdAudiotrack className="card-icon" />
          
      </div>
     {/*<a href={link} className="btn btn-primary">Read more</a>
     <FaStar className="star"
            size={25}
            onClick={Fave}
            style={{
              color: favourite ? 'gold' : 'lightgray',
              marginLeft: '30px',
            }}
          />*/}
    </div>
  </div>
  
  );
 }
 export default Card;