import { createContext, useContext, useState } from "react";

const CoinContext = createContext();

export default function CoinContextProvider({ children }) {
  const [coinCount, setCoinCount] = useState([]);

  return (
    <CoinContext.Provider value={{ coinCount, setCoinCount }}>
      {children}
    </CoinContext.Provider>
  );
}

export const CoinCount = () => {
  return useContext(CoinContext);
};
