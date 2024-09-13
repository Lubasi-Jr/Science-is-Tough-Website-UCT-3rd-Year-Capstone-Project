import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import FavContextProvider from "./context/favouriteContext";
import RecentActivityContextProvider from "./context/contextRecentActivity";
import AuthProvider from "./hooks/useAuth";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RecentActivityContextProvider>
        <FavContextProvider>
          <RouterProvider router={router} />
        </FavContextProvider>
      </RecentActivityContextProvider>
    </AuthProvider>
  </StrictMode>
);
