import { createContext, useContext, useState } from "react";

const FavContext = createContext();

export default function FavContextProvider({ children }) {
  const [favourite, setFavourite] = useState([]);

  return (
    <FavContext.Provider value={{ favourite, setFavourite }}>
      {children}
    </FavContext.Provider>
  );
}

export const Fav = () => {
  return useContext(FavContext);
};
