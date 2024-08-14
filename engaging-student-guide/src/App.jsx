
import React, { useState } from 'react';
import Home from './routes/Home.jsx';
import Card from './components/Card.jsx';
//import DistractMe from './routes/DistractMe.jsx';
//import AppWord from './AppWord.jsx';
//import Quiz from './Quiz.jsx';
//import Maze from './routes/Maze.jsx';

function App() {
  //using useState to set the views of the page and set certain cards to favourites when selected
  const [view, setView] = useState('home');
  const [favourite, setFavourite] = useState([]);
  

  const Fave = (card) => {
    let found = false;
    let newFave = [];
    /*For loop checks if selected card is already in the favourites.If card is found the boolean found is set to true ,else the card is added to newFave array*/
    for (let i = 0; i < favourite.length; i++) {
      if (favourite[i].id == card.id) {
        found = true;
      } else {
        newFave.push(favourite[i]);
      }
    }
  //If card was found remove card from favourites by updating the state with the newFave array*/
    if (found) {
      setFavourite(newFave);
    } //Add card to newFave array if not found and update the state with the setFavourite state with this array*/
    else {
      newFave.push(card);
      setFavourite(newFave);
    }
  };

/*Defining the cards*/
  const cards = [
    {
      id: 1,
      imageSrc: 'images/metacog.jpg',
      title: 'Metacognition: Your key to success',
      link: '#',
    },
    {
      id: 2,
      imageSrc:
        'https://img.buzzfeed.com/buzzfeed-static/static/2020-09/28/15/asset/fc1f2fac717b/anigif_sub-buzz-29608-1601307260-18_preview.gif?output-quality=auto&output-format=auto&downsize=360:*',
      title: 'How to succeed in your first BSc tests',
      link: '#',
    },
    {
      id: 3,
      imageSrc: 'images/ref.jpg',
      title: 'Make the most of your vac',
      link: '#',
    },
    {
      id: 4,
      imageSrc:
        'https://th.bing.com/th?id=OIF.ljB7NofIHqWXfUUV%2fMM5nQ&rs=1&pid=ImgDetMain',
      title: 'The shape of your well-being',
      link: '#',
    },
    {
      id: 5,
      imageSrc: 'images/clock.jpg',
      title: 'Next-level time management for succeeding at UCT',
      link: '#',
    },
    {
      id: 6,
      imageSrc:
        'https://www.shutterstock.com/image-vector/goldfish-jumping-out-one-fishbowl-600nw-1870441930.jpg',
      title: 'Culture shock at UCT',
      link: '#',
    },
    {
      id: 7,
      imageSrc: 'images/brain.jpg',
      title: 'So,how does your brain work?',
      link: '#',
    },
    {
      id: 8,
      imageSrc: 'images/finals.jpg',
      title: 'Acing exam season',
      link: '#',
    },
  ];

  return (
    <>
      <Home setView={setView} />
      {view == 'home' && ( 
        <div className="card-container">
          {cards.map((card) => (//Map each of the constant cards.For each object and card component is returned using the properties of the stored constant cards.
            <Card
              key={card.id}
              id={card.id}
              imageSrc={card.imageSrc}
              title={card.title}
              link={card.link}
              favourite={favourite.some((fav) => fav.id === card.id)}//check if card is a favourite by checking the favourite array
              Fave={() => Fave(card)} //method to add or remove cards from favouites
            />
          ))}
        </div>
      )}

      {view == 'favourites' && (
        <div className="fave-container">
          <h1 className="oswald-text">Your favourites:</h1>
          <div className="cards">
            {favourite.length > 0 ? (//checks if the number of cards in favourites is more than 0
              favourite.map((f) => (//map cards in favourites array and create a card component for each 
                <Card
                  key={f.id}
                  id={f.id}
                  imageSrc={f.imageSrc}
                  title={f.title}
                  link={f.link}
                  favourite={true}
                  Fave={() => Fave(f)}
                />
              ))
            ) : (
              <h4>You have not favourited any content yet!</h4>
            )}
          </div>
        </div>
      )}
  
      {view == 'distract' && (
        <div className='distract'>
          <h2 className = 'oswald-text'>Need a break ? Play some wordle </h2> 
        <Maze /> 
        </div>)}

      
    </>
  );
}

export default App;