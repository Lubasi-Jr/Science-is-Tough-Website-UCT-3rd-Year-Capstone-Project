import { createContext, useContext, useState } from "react";

const ContentContext = createContext();
{/*state management for content and allows other components to access this too*/}
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
