import React from "react";
import Home from "./routes/Home.jsx";
import Card from "./components/Card.jsx";

import { useState } from "react";

function App() {
  const [view, setView] = useState("home");
  const [favourite, setFavourite] = useState([]);

  const Fave = (card) => {
    let found = false;
    let newFave = [];
    for (let i = 0; i < favourite.length; i++) {
      if (favourite[i].id == card.id) {
        found = true;
      } else {
        newFave.push(favourite[i]);
      }
    }
    if (found) {
      setFavourite(newFave);
    } else {
      newFave.push(card);
      setFavourite(newFave);
    }
  };

  const cards = [
    {
      id: 1,
      imageSrc: "images/metacog.jpg",
      title: "Metacognition: Your key to success",
      link: "content.html",
    },
    {
      id: 2,
      imageSrc:
        "https://img.buzzfeed.com/buzzfeed-static/static/2020-09/28/15/asset/fc1f2fac717b/anigif_sub-buzz-29608-1601307260-18_preview.gif?output-quality=auto&output-format=auto&downsize=360:*",
      title: "How to succeed in your first BSc tests",
      link: "content.html",
    },
    {
      id: 3,
      imageSrc: "images/ref.jpg",
      title: "Make the most of your vac",
      link: "content.html",
    },
    {
      id: 4,
      imageSrc:
        "https://th.bing.com/th?id=OIF.ljB7NofIHqWXfUUV%2fMM5nQ&rs=1&pid=ImgDetMain",
      title: "The shape of your well-being",
      link: "content.html",
    },
    {
      id: 5,
      imageSrc: "images/clock.jpg",
      title: "Next-level time management for succeeding at UCT",
      link: "#content.html",
    },
    {
      id: 6,
      imageSrc:
        "https://www.shutterstock.com/image-vector/goldfish-jumping-out-one-fishbowl-600nw-1870441930.jpg",
      title: "Culture shock at UCT",
      link: "content.html",
    },
    {
      id: 7,
      imageSrc: "images/brain.jpg",
      title: "So,how does your brain work?",
      link: "content.html",
    },
    {
      id: 8,
      imageSrc: "images/finals.jpg",
      title: "Acing exam season",
      link: "content.html",
    },
  ];

  return (
    <>
      <Home setView={setView} />
      {view == "home" && (
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
      )}

      {view == "favourites" && (
        <div className="fave-container">
          <h1>Your favourites</h1>
          <div className="cards">
            {favourite.length > 0 ? (
              favourite.map((f) => (
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
              <h4>You have not favourited any content yet</h4>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
