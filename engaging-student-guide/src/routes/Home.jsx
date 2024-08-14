import { useState } from "react";
import Card from "../components/Card";
import { Content } from "../models/content";

function Home() {
  const cards = [
    new Content(1, "/metacog.jpg", "Metacognition: Your key to success"),
    new Content(
      2,
      "https://img.buzzfeed.com/buzzfeed-static/static/2020-09/28/15/asset/fc1f2fac717b/anigif_sub-buzz-29608-1601307260-18_preview.gif?output-quality=auto&output-format=auto&downsize=360:*",
      "How to succeed in your first BSc tests",
      "#"
    ),
    new Content(3, "ref.jpg", "Make the most of your vac", "#"),
    new Content(
      4,
      "https://th.bing.com/th?id=OIF.ljB7NofIHqWXfUUV%2fMM5nQ&rs=1&pid=ImgDetMain",
      "The shape of your well-being",
      "#"
    ),
    new Content(
      5,
      "/clock.jpg",
      "Next-level time management for succeeding at UCT"
    ),
    new Content(
      6,
      "https://www.shutterstock.com/image-vector/goldfish-jumping-out-one-fishbowl-600nw-1870441930.jpg",
      "Culture shock at UCT",
      "#"
    ),
    new Content(7, "brain.jpg", "So,how does your brain work?", "#"),
    new Content(8, "/finals.jpg", "Acing exam season", "#"),
  ];

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
