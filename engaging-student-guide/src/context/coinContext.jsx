import { createContext, useContext, useState } from "react";
//holds and shares coin related state
const CoinContext = createContext();
{/*state management for coincount and allows other components to access this too*/}
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
