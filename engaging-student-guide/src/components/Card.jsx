import React from 'react';
import { FaStar } from 'react-icons/fa';


function Card({id,imageSrc,title,link,favourite,Fave}){
  /*console.log(`Card Props - ID: ${id}, Favourite: ${favourite}`);*/
  return(
   <div className="card" style={{width: "15rem",height:"20rem"}}>
    <img src={imageSrc}className="card-img-top" alt="..." style={{height:"120px",width: "120px"}} />
    
    <div className="card-body">
     <h5 className="card-title">{title}</h5>
    
     <a href={link} className="btn btn-primary">Read more</a>
     <FaStar className="star"
            size={25}
            onClick={Fave}
            style={{
              color: favourite ? 'gold' : 'lightgray',
              marginLeft: '30px',
            }}
          />
    </div>
  </div>
  
  );
 }
 export default Card;