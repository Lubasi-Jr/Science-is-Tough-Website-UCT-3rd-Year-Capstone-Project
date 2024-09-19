/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const RecentActivityContext = createContext();
{/*state management for recent activity of user and allows other components to access this too*/}
export default function RecentActivityContextProvider({ children }) {
  const [recentContent, setRecentContent] = useState(null);
  const [contentType, setContentType] = useState("pdf");

  return (
    <RecentActivityContext.Provider
      value={{ recentContent, setRecentContent, contentType, setContentType }}
    >
      {children}
    </RecentActivityContext.Provider>
  );
}

export const RecentContext = () => {
  return useContext(RecentActivityContext);
};
