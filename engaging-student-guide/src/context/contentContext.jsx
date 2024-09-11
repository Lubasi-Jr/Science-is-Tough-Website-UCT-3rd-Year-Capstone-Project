import { createContext, useContext, useState } from "react";

const ContentContext = createContext();

export default function ContentContextProvider({ children }) {
  const [content, setContent] = useState([]);

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export const Content = () => {
  return useContext(ContentContext);
};
