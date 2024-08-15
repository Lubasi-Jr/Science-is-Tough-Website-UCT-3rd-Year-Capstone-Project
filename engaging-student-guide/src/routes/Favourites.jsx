import Card from "../components/Card";
import { Fav } from "../context/favouriteContext";

export default function Favourites() {
  const { favourite, setFavourite } = Fav();

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
      <div className="fave-container">
        <h1 className="oswald-text">Your favourites</h1>
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
    </>
  );
}
