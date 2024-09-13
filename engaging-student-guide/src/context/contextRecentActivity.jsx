import { createContext, useContext, useState } from "react";

const RecentActivityContext = createContext();

export default function RecentActivityContextProvider({ children }) {
  const [recentContent, setRecentContent] = useState(null);
  const [contentType, setContentType] = useState(null);

  return (
    <RecentActivityContext.Provider value={{ recentContent, setRecentContent, contentType, setContentType }}>
      {children}
    </RecentActivityContext.Provider>
  );
}

export const RecentContext = () => {
  return useContext(RecentActivityContext);
};
