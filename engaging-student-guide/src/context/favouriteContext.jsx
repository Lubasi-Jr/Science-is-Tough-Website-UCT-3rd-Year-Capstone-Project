import { createContext, useContext, useState } from "react";

const FavContext = createContext();

// eslint-disable-next-line react/prop-types
export default function FavContextProvider({ children }) {
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
    <FavContext.Provider value={{ favourite, setFavourite ,Fave}}>
      {children}
    </FavContext.Provider>
  );
}

export const Fav = () => {
  return useContext(FavContext);
};
