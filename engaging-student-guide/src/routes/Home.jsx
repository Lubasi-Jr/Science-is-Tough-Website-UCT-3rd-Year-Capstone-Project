import { useState} from "react";
import Card from "../components/Card";

function Home() {
  const cards = [{
    id:1,
    imageSrc : "/metacog.jpg",
    title:"Metacognition: Your key to success",
    link :"#"
},
{
  id:2,
  imageSrc : "https://img.buzzfeed.com/buzzfeed-static/static/2020-09/28/15/asset/fc1f2fac717b/anigif_sub-buzz-29608-1601307260-18_preview.gif?output-quality=auto&output-format=auto&downsize=360:*",
  title:"How to succeed in your first BSc tests",
  link : "#"
},
{
  id:3,
  imageSrc :"/ref.jpg",
  title:"Make the most of your vac",
  link : "#"
},
{
  id:4,
  imageSrc : "https://th.bing.com/th?id=OIF.ljB7NofIHqWXfUUV%2fMM5nQ&rs=1&pid=ImgDetMain",
  title:"The shape of your well-being",
  link : "#"
},
{
  id:5,
  imageSrc: "/clock.jpg",
  title:"Next-level time management for succeeding at UCT",
  link :"#"
},
{
  id:6,
  imageSrc : "https://www.shutterstock.com/image-vector/goldfish-jumping-out-one-fishbowl-600nw-1870441930.jpg",
  title:"Culture shock at UCT",
  link : "#"
},
{
  id:7,
  imageSrc :"/brain.jpg",
  title:"So,how does your brain work?",
  link : "#"
},
{
  id:8,
  imageSrc : "/finals.jpg",
  title:"Acing exam season",
  link : "#"
}
]

const [favourite, setFavourite] = useState([]);


const Fave = (card)=>{
  let found = false;
  let newFave = [];
  for(let i=0;i<favourite.length;i++){
    if(favourite[i].id==card.id){
      found=true;
    }
    else{
      newFave.push(favourite[i])
    }
  }
  if(found){
    setFavourite(newFave);
  }
  else{
    newFave.push(card);
    setFavourite(newFave);
  }
}
  return (
    <>
      <div className="card-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            imageSrc={card.imageSrc}
            title={card.title}
            link={card.link}
            favourite={favourite.some((fav) => fav.id === card.id)}
            Fave={() => Fave(card)}
          />
        ))}
      </div>
    </>
  );
}
export default Home;
